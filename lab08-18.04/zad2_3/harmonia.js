/*jshint esversion: 6, browser: true */

document.addEventListener("DOMContentLoaded", () => {
  bd = document.querySelectorAll(".bd");

  bd.forEach(element => {
    element.hidden = true;
  });

  OnClick = element => {
    let bd = element.nextElementSibling;
    if (bd.hidden) {
      bd.hidden = false;
    } else {
      bd.hidden = true;
    }
  };

  OnMouseOver = element => {
    let bd = element.nextElementSibling;
    bd.hidden = false;
  };

  OnMouseOut = element => {
    let bd = element.nextElementSibling;
    bd.hidden = true;
  };

  hd = document.querySelectorAll(".hd");

  hd.forEach(element => {
    //element.addEventListener("click",OnClick.bind(this,element));
    element.addEventListener("mouseover", OnMouseOver.bind(this, element));
    element.addEventListener("mouseout", OnMouseOut.bind(this, element));
  });
});
