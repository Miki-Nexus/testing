export const BASE_URL = 'https://gissrv.diba.cat';

export const ENDPOINTS = {
    lastYear: () => {
        return `${BASE_URL}/arcgis/rest/services/SITAC/PAES/MapServer/15/query?where=1=1&returnGeometry=false&f=pjson`;
    },
    exb: objectid => {
        return `https://experience.arcgis.com/experience/492a0462e3154325953ef2dc15b823c6?draft=true#data_s=id%3AdataSource_1-2%3A${objectid}`;
    },
    municipi: codi => {
        return `${BASE_URL}/arcgis/rest/services/SITAC/PAES/MapServer/2/query?where=ine%3D${codi}&outFields=objectid,nommuni&returnGeometry=false&f=pjson`;
    },
    /**
     * @param {number} codi del municipi
     * @returns la url per fer la petició
     */
    ce: (codi, year) => {
        return `${BASE_URL}/arcgis/rest/services/SITAC/PAES/MapServer/3/query?where=ce_codi_ine%3D${codi}+and+ce_any%3D${year}&outFields=ce_tendencia&returnGeometry=false&f=pjson`;
    },
    /**
     * @param {number} codi del municipi
     * @returns la url per fer la petició
     */
    geh: (codi, year) => {
        return `${BASE_URL}/arcgis/rest/services/SITAC/PAES/MapServer/7/query?where=co2_codi_ine%3D${codi}+and+co2_any%3D${year}&outFields=co2_tendencia&returnGeometry=false&f=pjson`;
    },
    /**
     * @param {number} codi del municipi
     * @returns la url per fer la petició
     */
    per: (codi, year) => {
        return `${BASE_URL}/arcgis/rest/services/SITAC/PAES/MapServer/11/query?where=eerr_codi_ine%3D${codi}+and+eerr_any%3D${year}&outFields=eerr_tendencia&returnGeometry=false&f=pjson`;
    }
}

export const VALUES = {
    ce_valor: {
        min: -36,
        max: -27,
        /**
         * @param {number} value el valor actual
         * @param {HTMLParagraphElement} $p l'element al qual volem aplicar l'estil corresponent
         */
        applyStyle: function (value, $p) {
            if (value < this.min) $p.classList.add('green');
            else if (value > this.max && value < this.min) $p.classList.add('orange');
            else if (value > this.max) $p.classList.add('red');
        }
    },
    geh_valor: {
        min: -55,
        max: -41.25,
        /**
         * @param {number} value el valor actual
         * @param {HTMLParagraphElement} $p l'element al qual volem aplicar l'estil corresponent
         */
        applyStyle: function (value, $p) {
            if (value < this.min) $p.classList.add('green');
            else if (value > this.max && value < this.min) $p.classList.add('orange');
            else if (value > this.max) $p.classList.add('red');
        }
    },
    per_valor: {
        min: 31.87,
        max: 42.5,
        /**
         * @param {number} value el valor actual
         * @param {HTMLParagraphElement} $p l'element al qual volem aplicar l'estil corresponent
         */
        applyStyle: function (value, $p) {
            if (value > this.max) $p.classList.add('green');
            else if (value > this.min && value < this.max) $p.classList.add('orange');
            else if (value < this.min) $p.classList.add('red');
        }
    }
}