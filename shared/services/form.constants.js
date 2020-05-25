const REGEXP = {
    FIELDTEXT: /^[a-zA-Z0-9].{2,300}$/,
    PHONE: /^((\+34)([\d]{9}))$|^((0034)[\d]{9})$|^[^0034][^+34]([\d]{7})$/,
    DATE: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
    FIELDNUMBERS:/^[0-9].{1,2}/,
    DNI:/^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
};
 