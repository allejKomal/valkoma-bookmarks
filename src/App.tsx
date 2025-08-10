import './App.css'
import { TooltipProvider } from 'valkoma-package/primitive'
import { ModeToggle } from 'valkoma-package/design-system'
import { ThemeProvider } from 'valkoma-package/hooks'
import BookmarkWrapper from './components/bookmark-wrapper'

function App() {

  return (
    <TooltipProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme" showLoader={true}>
        <BookmarkWrapper />
        <div className="fixed bottom-4 right-4 z-50">
          <ModeToggle />
        </div>
      </ThemeProvider>
    </TooltipProvider>
  )
}

export default App
