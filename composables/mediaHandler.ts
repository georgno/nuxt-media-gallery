export const mediaHandler = () => {
    return getDummyData();
}

function getDummyData() {
    return [
        { id: 1, title: 'media 1', alt: 'foo' },
        { id: 2, title: 'media 2', alt: 'bar' },
        { id: 3, title: 'media 3', alt: 'baz' },
        { id: 4, title: 'media 4', alt: 'qux' },
        { id: 5, title: 'media 5', alt: 'quux' },
    ]
}
