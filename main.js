const ENDPOINTS = {
    ce: (codi) => {
        return `https://gissrv.diba.cat/arcgis/rest/services/SITAC/PAES/MapServer/3/query?where=ce_codi_ine%3D${codi}+and+ce_any%3D2006&spatialRel=esriSpatialRelIntersects&outFields=ce_tendencia&returnGeometry=false&f=pjson`
    }
}

onLoad();

async function onLoad() {
    console.debug('loaded!');

    const url = new URL(window.location.href);
    const codi = url.searchParams.get("codi");

    if (!codi) {
        console.error("no s'ha especificat el codi!");
        return;
    }

    console.debug(codi)

    const res = await fetch(ENDPOINTS.ce(codi)).then(res => res.json()).catch(err => {
        console.error(err);

        return null;
    });

    console.debug(res)

    if (!res) return;

    const ce = res.features[0].attributes.CE_TENDENCIA;

    const $p = document.getElementById('ce_valor');

    if ($p) $p.innerText = ce;

    if (ce < -36) $p.classList.add('green');
    else if (ce > -27 && ce < -36) $p.classList.add('orange');
    else if (ce > -27) $p.classList.add('red');
}