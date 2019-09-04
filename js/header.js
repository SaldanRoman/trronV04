// Attaches the navigation menu at the top of the display
// 150 and 247 height between the top of the display and the navigation menu, with different display widths
window.addEventListener('scroll', function() {
  const scroll = pageYOffset;
  const width = screen.width;
if (scroll > 150 & width > 880) {
// Attaches the navigation menu to the top of the screen
    document.getElementsByClassName("header-wrapper--grey")[0].classList.add("header-wrapper--grey--fixed");
// Changes the position 
    document.getElementsByClassName("header-nav-catalog")[0].classList.add("header-nav-catalog--unset");
// Fix marggin 
    document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.add("header-nav-catalog-list-list--scroll");
// Displays the button navigation (search, user, shopping cart) in the navigation bar
    document.getElementsByClassName("header-nav-scroll")[0].classList.add("header-nav-scroll--show");
// Кeduces the menu button (takes the name of the "menu")
    document.getElementsByClassName("header-nav-menu-name")[0].classList.add("header-nav-menu-name--none");
} else if (scroll > 247 & width < 880){
        document.getElementsByClassName("header-wrapper--grey")[0].classList.add("header-wrapper--grey--fixed");
        document.getElementsByClassName("header-nav-catalog")[0].classList.add("header-nav-catalog--unset");
        document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.add("header-nav-catalog-list-list--scroll");
} else {
        document.getElementsByClassName("header-wrapper--grey")[0].classList.remove("header-wrapper--grey--fixed");
        document.getElementsByClassName("header-nav-menu-name")[0].classList.remove("header-nav-menu-name--none");
        document.getElementsByClassName("header-nav-scroll")[0].classList.remove("header-nav-scroll--show");
        document.getElementsByClassName("header-nav-catalog")[0].classList.remove("header-nav-catalog--unset");
        document.getElementsByClassName("header-nav-catalog-list-list")[0].classList.remove("header-nav-catalog-list-list--scroll");
}
});
document.getElementsByClassName("header-nav-menu")[0].addEventListener('click', closelist);
document.getElementsByClassName("header-nav-catalog")[0].addEventListener('click',closelist);
document.getElementsByClassName("header-mid-right-basket")[0].addEventListener('click',closelist);
document.getElementsByClassName("conteiner-stop-link")[0].addEventListener('click',function(){ 
document.getElementsByClassName("conteiner-stop-link")[0].classList.remove("conteiner-stop-link--block");
});
// function creates a container that prevents linking or button presses when closing drop down
function closelist(){ 
        document.getElementsByClassName("conteiner-stop-link")[0].classList.add("conteiner-stop-link--block");
};