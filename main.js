import { ENDPOINTS, VALUES } from "./constants.js";

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
        console.log(res)

        if (res[1]) applyStyleAndValue(res[1], 'ce_valor', 'CE_TENDENCIA');
        if (res[2]) applyStyleAndValue(res[2], 'geh_valor', 'CO2_TENDENCIA');
        if (res[3]) applyStyleAndValue(res[3], 'per_valor', 'EERR_TENDENCIA');

        const $loader = document.getElementById('loading');

        if ($loader) {
            $loader.classList.add('hide');
            
            setTimeout(() => {
                $loader.remove();
            }, 505);
        }
    });
}

/**
 * Busca l'element HTML i aplica el valor i color corresponent
 * @param {any} response el resultat de la petició
 * @param {string} id del element HTML que volem agafar
 * @param {string} field el nom del camp del que volem agafar les dades
 */
function applyStyleAndValue(response, id, field) {
    console.log(response)

    const value = response.features[0].attributes[field];

    const $p = document.getElementById(id);

    if (!$p) {
        console.error(`No s'ha trobat el paragraf amb id '${id}'!`);
        return;
    }

    $p.innerText = value;

    VALUES[id].applyStyle(value, $p);
}