import { ENDPOINTS, VALUES } from "./constants.js";

const { animate } = Motion;

onLoad();

async function onLoad() {
    const url = new URL(window.location.href);
    const codi = url.searchParams.get("codi");

    if (!codi) {
        console.error("no s'ha especificat el codi!");
        return;
    }

    Promise.all([
        fetch(ENDPOINTS.municipi(codi)).then(res => res.json()).catch(err => {
            console.error(err);
    
            return null;
        }),
        fetch(ENDPOINTS.ce(codi)).then(res => res.json()).catch(err => {
            console.error(err);
    
            return null;
        }),
        fetch(ENDPOINTS.geh(codi)).then(res => res.json()).catch(err => {
            console.error(err);
    
            return null;
        }),
        fetch(ENDPOINTS.per(codi)).then(res => res.json()).catch(err => {
            console.error(err);
    
            return null;
        })
    ]).then(res => {
        if (res[0] && res[0].features.length > 0) {
            const attr = res[0].features[0].attributes;

            const $b = document.getElementById('nom-muni');

            if ($b) $b.innerText = attr.NOMMUNI;

            /**
             * @type {HTMLAnchorElement}
             */
            const $a = document.getElementById('to-builder');

            if ($a) $a.href = ENDPOINTS.exb(attr.OBJECTID);
        }
        if (res[1]) applyStyle(res[1], 'ce_valor', 'CE_TENDENCIA');
        if (res[2]) applyStyle(res[2], 'geh_valor', 'CO2_TENDENCIA');
        if (res[3]) applyStyle(res[3], 'per_valor', 'EERR_TENDENCIA');

        const $loader = document.getElementById('loading');

        if ($loader) {
            $loader.classList.add('hide');
            
            setTimeout(() => {
                $loader.remove();

                animateValue(res[1], 'ce_valor', 'CE_TENDENCIA');
                animateValue(res[2], 'geh_valor', 'CO2_TENDENCIA');
                animateValue(res[3], 'per_valor', 'EERR_TENDENCIA');
            }, 500);
        }
    }).catch(err => {
        console.error(err);
    });
}

/**
 * Busca l'element HTML i aplica el valor i color corresponent
 * @param {any} response el resultat de la petició
 * @param {string} id del element HTML que volem agafar
 * @param {string} field el nom del camp del que volem agafar les dades
 */
function applyStyle(response, id, field) {
    if (response.features.length === 0) {
        console.error('No hi ha cap dada en la resposta!');
        return;
    }

    const value = response.features[0].attributes[field];

    const $p = document.getElementById(id);

    if (!$p) {
        console.error(`No s'ha trobat el paragraf amb id '${id}'!`);
        return;
    }

    VALUES[id].applyStyle(value, $p);
}

function animateValue(response, id, field) {
    if (response.features.length === 0) {
        console.error('No hi ha cap dada en la resposta!');
        return;
    }

    const value = response.features[0].attributes[field];

    const $p = document.getElementById(id);

    if (!$p) {
        console.error(`No s'ha trobat el paragraf amb id '${id}'!`);
        return;
    }
    
    animate(0, value, {
        onUpdate: latest => $p.innerText = latest.toFixed(4),
        duration: 2.5 + clamp(Math.random(), 0, .5)
    });
}

function clamp(value, min, max) {
    if (value > max) return max;
    else if (value < min) return min;

    return value;
}