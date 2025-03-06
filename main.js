window.addEventListener('load', onLoad);

function onLoad() {
    console.debug('loaded!');

    const url = new URL(window.location.href);
    const codi = url.searchParams.get("codi");

    if (!codi) {
        console.error("no s'ha especificat el codi!");
        return;
    }

    console.debug(codi)

    const $p = document.getElementById('codi');

    if ($p) $p.innerText = codi;
}