export default str =>
    (" " + str).toLowerCase()
        .replace( /[^a-zA-ZÀ-ÖØ-öø-ÿ0-9]+(.)/g, (match, chr) => " " + chr.toUpperCase() )
        .trim();
