const postData = async (url, data) => { //созд функцию postData,настраивает запрос,посылает на сервер(promise),
    const res = await fetch(url, { //получает ответ и трансформирует его в json
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json(); //метод с промиса
};
const getResource = async (url) => { //созд get запрос 
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url} ,status ${res.status}`);
    }


    return await res.json();
};
export {postData};
export {getResource};