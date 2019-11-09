import 'purecss';
import './test.scss';

export default (text = "Hello World!! Lets learn webpack") => {
    const element = document.createElement("div");
    element.innerHTML = text;
    element.className = "pure-button";

    return element;
}