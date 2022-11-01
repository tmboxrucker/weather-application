const createHeader = async () => {
    setTimeout(`console.log('inside header timeout');`, 1000);
    console.log('past the header timeout');
    const div = document.createElement('div');
    return div;
}

const createMain = () => {
    setTimeout(`console.log('inside main timeout');`, 1000);
    console.log('past the main timeout');
    const div = document.createElement('div');
    return div;

}

const createFooter = () => {
    setTimeout(`console.log('inside footer timeout');`, 1000);
    console.log('past the footer timeout');
    const div = document.createElement('div');
    return div;

}

const setLocation = () => {
    console.log('inside set location')
}

export const initialPageLoad = async () => {
    console.log(`let's get started`)
    const contentMain = document.getElementById('content');
    
    // await let child = createHeader();

    // contentMain.appendChild(child);

    const promise1 = createHeader();
    const promise2 = createMain();
    const promise3 = createFooter();

    Promise.all([promise1, promise2, promise3]).then((values) => {
        console.log(values);
    })
    // await contentMain.appendChild(createHeader());
    // await contentMain.appendChild(createMain());
    // await contentMain.appendChild(createFooter());

    setLocation()
}