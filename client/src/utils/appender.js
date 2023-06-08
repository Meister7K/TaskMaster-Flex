export const appendScript = (jsPath) =>{
    const script = document.createElement('script');

    script.src = jsPath;
    script.async = true;
    document.body.appendChild(script);
}