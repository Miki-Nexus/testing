export const ENDPOINTS = {
    municipi: codi => {
        return `https://gissrv.diba.cat/arcgis/rest/services/SITAC/PAES/MapServer/2/query?where=ine%3D${codi}&outFields=objectid,ine&returnGeometry=false&f=pjson`;
    },
    /**
     * @param {number} codi del municipi
     * @returns la url per fer la petició
     */
    ce: codi => {
        return `https://gissrv.diba.cat/arcgis/rest/services/SITAC/PAES/MapServer/3/query?where=ce_codi_ine%3D${codi}+and+ce_any%3D2006&outFields=ce_tendencia&returnGeometry=false&f=pjson`;
    },
    /**
     * @param {number} codi del municipi
     * @returns la url per fer la petició
     */
    geh: codi => {
        return `https://gissrv.diba.cat/arcgis/rest/services/SITAC/PAES/MapServer/7/query?where=co2_codi_ine%3D${codi}+and+co2_any%3D2006&outFields=co2_tendencia&returnGeometry=false&f=pjson`;
    },
    /**
     * @param {number} codi del municipi
     * @returns la url per fer la petició
     */
    per: codi => {
        return `https://gissrv.diba.cat/arcgis/rest/services/SITAC/PAES/MapServer/11/query?where=eerr_codi_ine%3D${codi}+and+eerr_any%3D2006&outFields=eerr_tendencia&returnGeometry=false&f=pjson`;
    }
}

export const VALUES = {
    ce_valor: {
        green: -36,
        orange: {
            min: -27,
            max: -36
        },
        red: -27,
        /**
         * @param {number} value el valor actual
         * @param {HTMLParagraphElement} $p l'element al qual volem aplicar l'estil corresponent
         */
        applyStyle: function (value, $p) {
            console.log(this)
            if (value < this.green) $p.classList.add('green');
            else if (value > this.orange.min && value < this.orange.max) $p.classList.add('orange');
            else if (value > this.red) $p.classList.add('red');
        }
    },
    geh_valor: {
        green: -55,
        orange: {
            min: -41.25,
            max: -55
        },
        red: -41.25,
        /**
         * @param {number} value el valor actual
         * @param {HTMLParagraphElement} $p l'element al qual volem aplicar l'estil corresponent
         */
        applyStyle: function (value, $p) {
            console.log(this)
            if (value < this.green) $p.classList.add('green');
            else if (value > this.orange.min && value < this.orange.max) $p.classList.add('orange');
            else if (value > this.red) $p.classList.add('red');
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
            console.log(this)
            if (value > this.max) $p.classList.add('green');
            else if (value > this.min && value < this.max) $p.classList.add('orange');
            else if (value < this.min) $p.classList.add('red');
        }
    }
}