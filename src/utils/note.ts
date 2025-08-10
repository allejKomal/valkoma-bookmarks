export type Bookmark = {
    id: number;
    title: string;
    URL: string;
    Tags: string[];
    Description: string;
    Category: string
}

export type GitHubFileContent = {
    name: string
    path: string
    sha: string
    size: number
    url: string
    html_url: string
    git_url: string
    download_url: string
    type: "file" | "dir"
    content?: string
    encoding?: string
    _links: {
        git: string
        self: string
        html: string
    }
}
