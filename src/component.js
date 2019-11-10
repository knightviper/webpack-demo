import 'purecss';
import './test.scss';

export default (text = "Hello World!! Lets learn webpack") => {
    const element = document.createElement("div");
    element.innerHTML = text;
    element.className = "pure-button";

    element.onclick = () =>
        import("./lazy")
            .then(lazy => {
                element.textContent = lazy.default;
            })
            .catch(err => {
                console.error(err);
            });

    return element;
}