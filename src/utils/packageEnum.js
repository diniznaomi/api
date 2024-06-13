const getPeriodicity = (id) => {
    const DIARIA = 'DIARIA';
    const MENSAL = 'MENSAL';
    const BIMESTRAL = 'BIMESTRAL';
    const TRIMESTRAL = 'TRIMESTRAL';
    const QUADRIMESTRAL = 'QUADRIMESTRAL';
    const SEMESTRAL = 'SEMESTRAL';
    const ANUAL = 'ANUAL';

    switch(id){
        case 0:
            return DIARIA;
        case 1:
            return MENSAL;
        case 2:
            return BIMESTRAL;
        case 3:
            return TRIMESTRAL;
        case 4:
            return QUADRIMESTRAL;
        case 6:
            return SEMESTRAL;
        case 12:
            return ANUAL;
        default:
            return null;
    };
}

module.exports = {
    getPeriodicity
};