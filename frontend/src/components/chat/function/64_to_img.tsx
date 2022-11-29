export function buffer_to_img(data : any){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));
    return `data:image/png;base64,${base64String}`
}