## Installation
```
 yarn add check-dom-check
```
## Usage
```
window.addEventListener('domExpose',(e) => {
   console.log(e.detail)
})
DomExpose(root,[domChild1,domChild2])


// remove listener
closeDomExpose(root)
```

