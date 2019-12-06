import {useEffect} from 'react'

function DocumentTitle(title) {

    useEffect(() => {
        document.title = `Sector Spain | ${title}`
    }, [title])
    
}

export default DocumentTitle
