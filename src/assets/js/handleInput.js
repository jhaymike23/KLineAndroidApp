// var handleInput = (function(event){
//     const searchbar = document.querySelector('ion-searchbar');
//     const items = Array.from(document.querySelector('ion-item').children);
//     searchbar.addEventListener('ionInput', handleInput);

//     const query = event.target.value.toLowerCase();
//     requestAnimationFrame(() => {
//         items.forEach(item => {
//             const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
//             item.style.display = shouldShow ? 'block' : 'none';
//         });
//     });
// })
/*function handleInput(event) {
    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-item').children);
    searchbar.addEventListener('ionInput', handleInput);

    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
        items.forEach(item => {
            const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
            item.style.display = shouldShow ? 'block' : 'none';
        });
    });
}*/

export { handleInput};