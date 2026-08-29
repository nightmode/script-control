//------------------------------------------
// Generate a list of ccTLD names from IANA
//------------------------------------------
// Run the following code at https://www.iana.org/domains/root/db to generate an updated array of country code top level domain names.
const country_code_domains = []

const rows = document.querySelectorAll('#tld-table tbody tr')

for (const row of rows) {
    if (row.querySelector('td:nth-child(2)').textContent === 'country-code') {
        let ccTLD = row.querySelector('td:nth-child(1) span a').textContent

        if (ccTLD.slice(0, 1) !== '.') {
            // right to left domain detected

            // remove "&rlm;" and "&lrm;" characters
            ccTLD = ccTLD.slice(1, -1)
        }

        ccTLD = ccTLD.replace('.', '')

        country_code_domains.push(ccTLD)
    }
} // for

console.log(JSON.stringify(country_code_domains).replaceAll('"', "'"))