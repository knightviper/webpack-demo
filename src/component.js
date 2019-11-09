import './test.scss';

export default (text = "Hello World!! Lets learn webpack") => {
    const element = document.createElement("div");
    element.innerHTML = text;

    return element;
}