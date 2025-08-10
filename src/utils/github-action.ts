"use server"

import type { Bookmark, GitHubFileContent } from "../utils/note"
import { Buffer } from "buffer"

const GITHUB_REPO_OWNER = "allejKomal"
const GITHUB_REPO_NAME = "valkoma-database"
const GITHUB_REPO_BRANCH = "master"
const GITHUB_PAT = ""


const ALL_NOTES_FILE_PATH = "data/bookmarks.json"

if (!GITHUB_REPO_OWNER || !GITHUB_REPO_NAME || !GITHUB_REPO_BRANCH) {
    console.warn(
        "Missing GitHub repository environment variables. Please set GITHUB_REPO_OWNER, GITHUB_REPO_NAME, and GITHUB_REPO_BRANCH.",
    )
}

const getGitHubHeaders = () => {
    const headers: HeadersInit = {
        "User-Agent": "Next.js-Miltfy-Read-Only-App",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if (GITHUB_PAT) {
        headers["Authorization"] = `Bearer ${GITHUB_PAT}`
    } else {
        console.warn("GITHUB_PAT is not set. Access to private repositories will fail.")
    }
    return headers
}

export async function getBookmarks(): Promise<Bookmark[]> {
    const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${ALL_NOTES_FILE_PATH}?ref=${GITHUB_REPO_BRANCH}`
    console.log(`[DEBUG] Attempting to fetch all notes from: ${url}`)

    try {
        const response = await fetch(url, {
            headers: getGitHubHeaders(),
            // next: { revalidate: 0 },
        })

        if (!response.ok) {
            console.error(
                `[ERROR] GitHub API error fetching all notes file: Status ${response.status} - ${response.statusText}`,
            )
            const errorBody = await response.text()
            console.error(`[ERROR] Response body for all notes file: ${errorBody}`)
            if (response.status === 404 || response.status === 403) {
                console.log("[DEBUG] All notes file not found or forbidden (404/403). Returning empty array.")
                return []
            }
            throw new Error(`GitHub API error fetching all notes file: ${response.statusText}`)
        }

        const data: GitHubFileContent = await response.json()
        if (data.type === "file" && data.content) {
            const decodedContent = Buffer.from(data.content, "base64").toString("utf-8")
            try {
                const notes: Bookmark[] = JSON.parse(decodedContent)
                console.log(`[DEBUG] Successfully parsed ${notes.length} notes from single file.`)
                return notes;
            } catch (parseError) {
                console.error(`[ERROR] Failed to parse JSON for all notes file:`, parseError)
                console.error(`[ERROR] Raw content for all notes file:`, decodedContent)
                return []
            }
        }
        console.log(`[DEBUG] All notes file is not a file or has no content.`)
        return []
    } catch (error: any) {
        console.error("[ERROR] Error getting all notes:", error.message)
        return []
    }
}

// export async function getNote(id: string): Promise<Bookmark | null> {
//     const allNotes = await getNotes() // Fetch all notes
//     return allNotes.find((note) => note.id === id) || null // Find the specific note by ID
// }

