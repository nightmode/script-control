'use strict'

//-------
// Notes
//-------
/*
    This reference JavaScript file is meant to be shared between different pages. It will also be included in the root level service worker which is built from more than one file.
*/

//-----------
// Variables
//-----------
const reference = {
    'second_level_domains': {
        // Country code second level domains which should NOT have *.domain rules applied to them because that would potentially allow too many sites to be affected.
        'country_code': [
            // Afghanistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.af', 'edu.af', 'gov.af', 'net.af', 'org.af',

            // Aland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ax domains

            // Albania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.al', 'edu.al', 'gov.al', 'mil.al', 'net.al', 'org.al',

            // Algeria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'art.dz', 'asso.dz', 'com.dz', 'edu.dz', 'gov.dz', 'net.dz', 'org.dz', 'pol.dz', 'soc.dz', 'tm.dz',

            // American Samoa  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.as',

            // Andorra  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'nom.ad',

            // Angola  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.ao', 'ed.ao', 'gv.ao', 'it.ao', 'og.ao', 'pb.ao',

            // Anguilla  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ai', 'net.ai', 'off.ai', 'org.ai',

            // Antarctica  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .aq domains

            // Antigua and Barbuda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.ag', 'com.ag', 'net.ag', 'nom.ag', 'org.ag',

            // Argentina  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'bet.ar', 'com.ar', 'coop.ar', 'edu.ar', 'gob.ar', 'gov.ar', 'int.ar', 'mil.ar', 'musica.ar', 'mutual.ar', 'net.ar', 'org.ar', 'senasa.ar', 'tur.ar',

            // Armenia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.am', 'com.am', 'commune.am', 'net.am', 'org.am',

            // Aruba  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.aw',

            // Ascension Island  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ac', 'edu.ac', 'gov.ac', 'mil.ac', 'net.ac', 'org.ac',

            // Australia  2023-10-07  https://www.auda.org.au/au-domain-names/au-domain-names
            'act.au', 'asn.au', 'com.au', 'csiro.au', 'edu.au', 'gov.au', 'id.au', 'net.au', 'nsw.au', 'nt.au', 'org.au', 'qld.au', 'sa.au', 'tas.au', 'vic.au', 'wa.au',

            // Austria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat and https://en.wikipedia.org/wiki/.at
            'ac.at', 'co.at', 'gv.at', 'or.at', 'priv.at',

            // Azerbaijan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.az', 'com.az', 'edu.az', 'gov.az', 'info.az', 'int.az', 'mil.az', 'name.az', 'net.az', 'org.az', 'pp.az', 'pro.az',

            // Bahamas  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bs', 'edu.bs', 'gov.bs', 'net.bs', 'org.bs',

            // Bahrain  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bh', 'edu.bh', 'gov.bh', 'net.bh', 'org.bh',

            // Bangladesh  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .bd domains

            // Barbados  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.bb', 'co.bb', 'com.bb', 'edu.bb', 'gov.bb', 'info.bb', 'net.bb', 'org.bb', 'store.bb', 'tv.bb',

            // Belarus  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.by', 'gov.by', 'mil.by',

            // Belgium  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.be',

            // Belize  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bz', 'edu.bz', 'gov.bz', 'net.bz', 'org.bz',

            // Benin  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'agro.bj', 'africa.bj', 'architectes.bj', 'assur.bj', 'avocats.bj', 'co.bj', 'com.bj', 'eco.bj', 'econo.bj', 'edu.bj', 'info.bj', 'loisirs.bj', 'money.bj', 'net.bj', 'org.bj', 'ote.bj', 'restaurant.bj', 'resto.bj', 'tourism.bj', 'univ.bj',

            // Bermuda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bm', 'edu.bm', 'gov.bm', 'net.bm', 'org.bm',

            // Bhutan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bt', 'edu.bt', 'gov.bt', 'net.bt', 'org.bt',

            // Bolivia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'academia.bo', 'agro.bo', 'arte.bo', 'blog.bo', 'bolivia.bo', 'ciencia.bo', 'com.bo', 'cooperativa.bo', 'democracia.bo', 'deporte.bo', 'ecologia.bo', 'economia.bo', 'edu.bo', 'empresa.bo', 'gob.bo', 'indigena.bo', 'industria.bo', 'info.bo', 'int.bo', 'medicina.bo', 'mil.bo', 'movimiento.bo', 'musica.bo', 'natural.bo', 'net.bo', 'nombre.bo', 'noticias.bo', 'org.bo', 'patria.bo', 'plurinacional.bo', 'politica.bo', 'profesional.bo', 'pueblo.bo', 'revista.bo', 'salud.bo', 'tecnologia.bo', 'tksat.bo', 'transporte.bo', 'tv.bo', 'web.bo', 'wiki.bo',

            // Bosnia and Herzegovina  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ba', 'edu.ba', 'gov.ba', 'mil.ba', 'net.ba', 'org.ba',

            // Botswana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.bw', 'org.bw',

            // Brazil  2023-10-07  https://registro.br/dominio/categorias/
            '9guacu.br', 'abc.br', 'adm.br', 'adv.br', 'agr.br', 'aju.br', 'am.br', 'anani.br', 'aparecida.br', 'app.br', 'arq.br', 'art.br', 'ato.br', 'b.br', 'barueri.br', 'belem.br', 'bhz.br', 'bib.br', 'bio.br', 'blog.br', 'bmd.br', 'boavista.br', 'bsb.br', 'campinagrande.br', 'campinas.br', 'caxias.br', 'cim.br', 'cng.br', 'cnt.br', 'com.br', 'contagem.br', 'coop.br', 'coz.br', 'cri.br', 'cuiaba.br', 'curitiba.br', 'def.br', 'des.br', 'det.br', 'dev.br', 'ecn.br', 'eco.br', 'edu.br', 'emp.br', 'enf.br', 'eng.br', 'esp.br', 'etc.br', 'eti.br', 'far.br', 'feira.br', 'flog.br', 'floripa.br', 'fm.br', 'fnd.br', 'fortal.br', 'fot.br', 'foz.br', 'fst.br', 'g12.br', 'geo.br', 'ggf.br', 'goiania.br', 'gov.br', 'gru.br', 'imb.br', 'ind.br', 'inf.br', 'jab.br', 'jampa.br', 'jdf.br', 'joinville.br', 'jor.br', 'jus.br', 'leg.br', 'lel.br', 'log.br', 'londrina.br', 'macapa.br', 'maceio.br', 'manaus.br', 'maringa.br', 'mat.br', 'med.br', 'mil.br', 'morena.br', 'mp.br', 'mus.br', 'natal.br', 'net.br', 'niteroi.br', 'nom.br', 'not.br', 'ntr.br', 'odo.br', 'ong.br', 'org.br', 'osasco.br', 'palmas.br', 'poa.br', 'ppg.br', 'pro.br', 'psc.br', 'psi.br', 'pvh.br', 'qsl.br', 'radio.br', 'rec.br', 'recife.br', 'rep.br', 'ribeirao.br', 'rio.br', 'riobranco.br', 'riopreto.br', 'salvador.br', 'sampa.br', 'santamaria.br', 'santoandre.br', 'saobernardo.br', 'saogonca.br', 'seg.br', 'sjc.br', 'slg.br', 'slz.br', 'sorocaba.br', 'srv.br', 'taxi.br', 'tc.br', 'tec.br', 'teo.br', 'the.br', 'tmp.br', 'trd.br', 'tur.br', 'tv.br', 'udi.br', 'vet.br', 'vix.br', 'vlog.br', 'wiki.br', 'zlg.br',

            // British Indian Ocean Territory  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.io',

            // British Virgin Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .vg domains

            // Brunei  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.bn', 'edu.bn', 'gov.bn', 'net.bn', 'org.bn',

            // Bulgaria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            '0.bg', '1.bg', '2.bg', '3.bg', '4.bg', '5.bg', '6.bg', '7.bg', '8.bg', '9.bg', 'a.bg', 'b.bg', 'c.bg', 'd.bg', 'e.bg', 'f.bg', 'g.bg', 'h.bg', 'i.bg', 'j.bg', 'k.bg', 'l.bg', 'm.bg', 'n.bg', 'o.bg', 'p.bg', 'q.bg', 'r.bg', 's.bg', 't.bg', 'u.bg', 'v.bg', 'w.bg', 'x.bg', 'y.bg', 'z.bg',

            // Burkina Faso  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.bf',

            // Burundi  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.bi', 'com.bi', 'edu.bi', 'or.bi', 'org.bi',

            // Cambodia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .kh domains

            // Cameroon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.cm', 'com.cm', 'gov.cm', 'net.cm',

            // Canada  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ab.ca', 'bc.ca', 'gc.ca', 'mb.ca', 'nb.ca', 'nf.ca', 'nl.ca', 'ns.ca', 'nt.ca', 'nu.ca', 'on.ca', 'pe.ca', 'qc.ca', 'sk.ca', 'yk.ca',

            // Cape Verde  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.cv', 'edu.cv', 'int.cv', 'nome.cv', 'org.cv',

            // Cayman Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat and https://en.wikipedia.org/wiki/.ky
            'com.ky', 'edu.ky', 'gov.ky', 'net.ky', 'org.ky',

            // Central African Republic  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cf domains

            // Chad  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .td domains

            // Chile  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.cl', 'gob.cl', 'gov.cl', 'mil.cl',

            // Christmas Island  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.cx',

            // Cocos (Keeling) Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cc domains

            // Colombia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.co', 'com.co', 'edu.co', 'firm.co', 'gov.co', 'info.co', 'int.co', 'mil.co', 'net.co', 'nom.co', 'org.co', 'rec.co', 'web.co',

            // Comoros  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ass.km', 'asso.km', 'com.km', 'coop.km', 'edu.km', 'gouv.km', 'gov.km', 'medecin.km', 'mil.km', 'nom.km', 'notaires.km', 'org.km', 'pharmaciens.km', 'prd.km', 'presse.km', 'tm.km', 'veterinaire.km',

            // Cook Islands  2023-10-07  https://en.wikipedia.org/wiki/.ck
            'biz.ck', 'co.ck', 'edu.ck', 'gen.ck', 'gov.ck', 'info.ck', 'net.ck', 'org.ck',

            // Costa Rica  2023-10-07  https://en.wikipedia.org/wiki/.ck
            'ac.cr', 'co.cr', 'ed.cr', 'fi.cr', 'go.cr', 'or.cr', 'sa.cr',

            // Cote d'Ivoire  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ci', 'aéroport.ci', 'asso.ci', 'co.ci', 'com.ci', 'ed.ci', 'edu.ci', 'go.ci', 'gouv.ci', 'int.ci', 'md.ci', 'net.ci', 'or.ci', 'org.ci', 'presse.ci',

            // Croatia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.hr', 'from.hr', 'iz.hr', 'name.hr',

            // Cuba  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.cu', 'edu.cu', 'gov.cu', 'inf.cu', 'net.cu', 'org.cu',

            // Cyprus  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.cy', 'biz.cy', 'com.cy', 'ekloges.cy', 'gov.cy', 'ltd.cy', 'mil.cy', 'net.cy', 'org.cy', 'press.cy', 'pro.cy', 'tm.cy',

            // Czech Republic  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cz domains

            // Democratic Republic of the Congo  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.cd',

            // Denmark  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .dk domains

            // Djibouti  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .dj domains

            // Dominica  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.dm', 'edu.dm', 'gov.dm', 'net.dm', 'org.dm',

            // Dominican Republic  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'art.do', 'com.do', 'edu.do', 'gob.do', 'gov.do', 'mil.do', 'net.do', 'org.do', 'sld.do', 'web.do',

             // East Timor  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
             'gov.tl',

            // Ecuador  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ec', 'edu.ec', 'fin.ec', 'gob.ec', 'gov.ec', 'info.ec', 'k12.ec', 'med.ec', 'mil.ec', 'net.ec', 'org.ec', 'pro.ec',

            // Egypt  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.eg', 'edu.eg', 'eun.eg', 'gov.eg', 'mil.eg', 'name.eg', 'net.eg', 'org.eg', 'sci.eg',

            // El Salvador  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sv', 'edu.sv', 'gob.sv', 'org.sv', 'red.sv',

            // Equatorial Guinea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gq domains

            // Eritrea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .er domains

            // Estonia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aip.ee', 'com.ee', 'edu.ee', 'fie.ee', 'gov.ee', 'lib.ee', 'med.ee', 'org.ee', 'pri.ee', 'riik.ee',

            // Eswatini  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.sz', 'co.sz', 'org.sz',

            // Ethiopia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.et', 'com.et', 'edu.et', 'gov.et', 'info.et', 'name.et', 'net.et', 'org.et',

            // European Union  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .eu domains

            // Falkland Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .fk domains

            // Faroe Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .fo domains

            // Federated States of Micronesia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.fm', 'edu.fm', 'net.fm', 'org.fm',

            // Fiji  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.fj', 'biz.fj', 'com.fj', 'gov.fj', 'info.fj', 'mil.fj', 'name.fj', 'net.fj', 'org.fj', 'pro.fj',

            // Finland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .fi domains

            // France  2023-10-07  https://tldprices.gandi.net/pdf/en/tld-prices-FR-EUR-A.pdf
            'aeroport.fr', 'avocat.fr', 'chambagri.fr', 'chirurgiensdentistes.fr', 'expertscomptables.fr', 'geometre-expert.fr', 'medecin.fr', 'notaires.fr', 'pharmacien.fr', 'port.fr', 'veterinaire.fr',

            // French Guiana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gf domains

            // French Polynesia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.pf', 'edu.pf', 'org.pf',

            // French Southern and Antarctic Lands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tf domains

            // Gabon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ga domains

            // Georgia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ge', 'edu.ge', 'gov.ge', 'mil.ge', 'net.ge', 'org.ge', 'pvt.ge',

            // Germany  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .de domains

            // Ghana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gh', 'edu.gh', 'gov.gh', 'mil.gh', 'org.gh',

            // Gibraltar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gi', 'edu.gi', 'gov.gi', 'ltd.gi', 'mod.gi', 'org.gi',

            // Greece  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gr', 'edu.gr', 'gov.gr', 'net.gr', 'org.gr',

            // Greenland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.gl', 'com.gl', 'edu.gl', 'net.gl', 'org.gl',

            // Grenada  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.gd', 'gov.gd',

            // Guadeloupe  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.gp', 'com.gp', 'edu.gp', 'mobi.gp', 'net.gp', 'org.gp',

            // Guam  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gu', 'edu.gu', 'gov.gu', 'guam.gu', 'info.gu', 'net.gu', 'org.gu', 'web.gu',

            // Guatemala  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.gt', 'edu.gt', 'gob.gt', 'ind.gt', 'mil.gt', 'net.gt', 'org.gt',

            // Guernsey  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.gg', 'net.gg', 'org.gg',

            // Guinea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.gn', 'com.gn', 'edu.gn', 'gov.gn', 'net.gn', 'org.gn',

            // Guinea-Bissau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gw domains

            // Guyana  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.gy', 'com.gy', 'edu.gy', 'gov.gy', 'net.gy', 'org.gy',

            // Haiti  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'adult.ht', 'art.ht', 'asso.ht', 'com.ht', 'coop.ht', 'edu.ht', 'firm.ht', 'gouv.ht', 'info.ht', 'med.ht', 'net.ht', 'org.ht', 'perso.ht', 'pol.ht', 'pro.ht', 'rel.ht', 'shop.ht',

            // Heard Island and McDonald Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .hm domains

            // Honduras  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.hn', 'edu.hn', 'gob.hn', 'mil.hn', 'net.hn', 'org.hn',

            // Hong Kong  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.hk', 'edu.hk', 'gov.hk', 'idv.hk', 'net.hk', 'org.hk',

            // Hungary  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            '2000.hu', 'agrar.hu', 'bolt.hu', 'casino.hu', 'city.hu', 'co.hu', 'erotica.hu', 'erotika.hu', 'film.hu', 'forum.hu', 'games.hu', 'hotel.hu', 'info.hu', 'ingatlan.hu', 'jogasz.hu', 'konyvelo.hu', 'lakas.hu', 'media.hu', 'news.hu', 'org.hu', 'priv.hu', 'reklam.hu', 'sex.hu', 'shop.hu', 'sport.hu', 'suli.hu', 'szex.hu', 'tm.hu', 'tozsde.hu', 'utazas.hu', 'video.hu',

            // Iceland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.is', 'edu.is', 'gov.is', 'int.is', 'net.is', 'org.is',

            // India  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            '5g.in', '6g.in', 'ac.in', 'ai.in', 'am.in', 'bihar.in', 'biz.in', 'business.in', 'ca.in', 'cn.in', 'co.in', 'com.in', 'coop.in', 'cs.in', 'delhi.in', 'dr.in', 'edu.in', 'er.in', 'firm.in', 'gen.in', 'gov.in', 'gujarat.in', 'ind.in', 'info.in', 'int.in', 'internet.in', 'io.in', 'me.in', 'mil.in', 'net.in', 'nic.in', 'org.in', 'pg.in', 'post.in', 'pro.in', 'res.in', 'travel.in', 'tv.in', 'uk.in', 'up.in', 'us.in',

            // Indonesia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.id', 'biz.id', 'co.id', 'desa.id', 'go.id', 'mil.id', 'my.id', 'net.id', 'or.id', 'ponpes.id', 'sch.id', 'web.id',

            // Iran  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ir', 'co.ir', 'gov.ir', 'id.ir', 'net.ir', 'org.ir', 'sch.ir',

            // Iraq  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.iq', 'edu.iq', 'gov.iq', 'mil.iq', 'net.iq', 'org.iq',

            // Ireland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.ie',

            // Isle of Man  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.im', 'co.im', 'com.im', 'ltd.co.im', 'net.im', 'org.im', 'plc.co.im', 'tt.im', 'tv.im',

            // Israel  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.il', 'co.il', 'gov.il', 'idf.il', 'k12.il', 'muni.il', 'net.il', 'org.il',

            // Italy  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.it', 'gov.it',

            // Jamaica  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .jm domains

            // Japan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.jp', 'ad.jp', 'aichi.jp', 'akita.jp', 'aomori.jp', 'chiba.jp', 'co.jp', 'ed.jp', 'ehime.jp', 'fukui.jp', 'fukuoka.jp', 'fukushima.jp', 'gifu.jp', 'go.jp', 'gr.jp', 'gunma.jp', 'hiroshima.jp', 'hokkaido.jp', 'hyogo.jp', 'ibaraki.jp', 'ishikawa.jp', 'iwate.jp', 'kagawa.jp', 'kagoshima.jp', 'kanagawa.jp', 'kochi.jp', 'kumamoto.jp', 'kyoto.jp', 'lg.jp', 'mie.jp', 'miyagi.jp', 'miyazaki.jp', 'nagano.jp', 'nagasaki.jp', 'nara.jp', 'ne.jp', 'niigata.jp', 'oita.jp', 'okayama.jp', 'okinawa.jp', 'or.jp', 'osaka.jp', 'saga.jp', 'saitama.jp', 'shiga.jp', 'shimane.jp', 'shizuoka.jp', 'tochigi.jp', 'tokushima.jp', 'tokyo.jp', 'tottori.jp', 'toyama.jp', 'wakayama.jp', 'yamagata.jp', 'yamaguchi.jp', 'yamanashi.jp',

            // Jersey  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.je', 'net.je', 'org.je',

            // Jordan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.jo', 'edu.jo', 'gov.jo', 'mil.jo', 'name.jo', 'net.jo', 'org.jo', 'sch.jo',

            // Kazakhstan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kz', 'edu.kz', 'gov.kz', 'mil.kz', 'net.kz', 'org.kz',

            // Kenya  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ke', 'co.ke', 'go.ke', 'info.ke', 'me.ke', 'mobi.ke', 'ne.ke', 'or.ke', 'sc.ke',

            // Kiribati  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.ki', 'com.ki', 'edu.ki', 'gov.ki', 'info.ki', 'net.ki', 'org.ki',

            // Kuwait  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kw', 'edu.kw', 'emb.kw', 'gov.kw', 'ind.kw', 'net.kw', 'org.kw',

            // Kyrgyzstan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kg', 'edu.kg', 'gov.kg', 'mil.kg', 'net.kg', 'org.kg',

            // Laos  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.la', 'edu.la', 'gov.la', 'info.la', 'int.la', 'net.la', 'org.la', 'per.la',

            // Latvia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asn.lv', 'com.lv', 'conf.lv', 'edu.lv', 'gov.lv', 'id.lv', 'mil.lv', 'net.lv', 'org.lv',

            // Lebanon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.lb', 'edu.lb', 'gov.lb', 'net.lb', 'org.lb',

            // Lesotho  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ls', 'biz.ls', 'co.ls', 'edu.ls', 'gov.ls', 'info.ls', 'net.ls', 'org.ls', 'sc.ls',

            // Liberia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.lr', 'edu.lr', 'gov.lr', 'net.lr', 'org.lr',

            // Lithuania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.lt',

            // Libya  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ly', 'edu.ly', 'gov.ly', 'id.ly', 'med.ly', 'net.ly', 'org.ly', 'plc.ly', 'sch.ly',

            // Liechtenstein  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .li domains

            // Luxembourg  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .lu domains

            // Macau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mo', 'edu.mo', 'gov.mo', 'net.mo', 'org.mo',

            // Madagascar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.mg', 'com.mg', 'edu.mg', 'gov.mg', 'mil.mg', 'nom.mg', 'org.mg', 'prd.mg', 'tm.mg',

            // Malaysia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.my', 'com.my', 'edu.my', 'gov.my', 'mil.my', 'name.my', 'net.my', 'org.my',

            // Malawi  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.mw', 'biz.mw', 'co.mw', 'com.mw', 'coop.mw', 'edu.mw', 'gov.mw', 'int.mw', 'museum.mw', 'net.mw', 'org.mw',

            // Maldives  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aero.mv', 'biz.mv', 'com.mv', 'coop.mv', 'edu.mv', 'gov.mv', 'info.mv', 'int.mv', 'mil.mv', 'museum.mv', 'name.mv', 'net.mv', 'org.mv', 'pro.mv',

            // Mali  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ml', 'edu.ml', 'gouv.ml', 'gov.ml', 'net.ml', 'org.ml', 'presse.ml',

            // Malta  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mt', 'edu.mt', 'net.mt', 'org.mt',

            // Marshall Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mh domains

            // Martinique  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mq domains

            // Mauritania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.mr',

            // Mauritius  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.mu', 'co.mu', 'com.mu', 'gov.mu', 'net.mu', 'or.mu', 'org.mu',

            // Mayotte  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .yt domains

            // Mexico  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mx', 'edu.mx', 'gob.mx', 'net.mx', 'org.mx',

            // Moldova  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .md domains

            // Monaco  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.mc', 'tm.mc',

            // Mongolia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.mn', 'gov.mn', 'org.mn',

            // Montenegro  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.me', 'co.me', 'edu.me', 'gov.me', 'its.me', 'net.me', 'org.me', 'priv.me',

            // Montserrat  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ms', 'edu.ms', 'gov.ms', 'net.ms', 'org.ms',

            // Morocco  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ma', 'co.ma', 'gov.ma', 'net.ma', 'org.ma', 'press.ma',

            // Mozambique  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.mz', 'adv.mz', 'co.mz', 'edu.mz', 'gov.mz', 'mil.mz', 'net.mz', 'org.mz',

            // Myanmar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mm domains

            // Namibia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ca.na', 'cc.na', 'co.na', 'com.na', 'dr.na', 'in.na', 'info.na', 'mobi.na', 'mx.na', 'name.na', 'or.na', 'org.na', 'pro.na', 'school.na', 'tv.na', 'us.na', 'ws.na',

            // Nauru  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.nr', 'com.nr', 'edu.nr', 'gov.nr', 'info.nr', 'net.nr', 'org.nr',

            // Nepal  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .np domains

            // Netherlands  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'co.nl',

            // New Caledonia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.nc', 'nom.nc',

            // New Zealand  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.nz', 'co.nz', 'cri.nz', 'geek.nz', 'gen.nz', 'govt.nz', 'health.nz', 'iwi.nz', 'kiwi.nz', 'maori.nz', 'māori.nz', 'mil.nz', 'net.nz', 'org.nz', 'parliament.nz', 'school.nz',

            // Nicaragua  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ni', 'biz.ni', 'co.ni', 'com.ni', 'edu.ni', 'gob.ni', 'in.ni', 'info.ni', 'int.ni', 'mil.ni', 'net.ni', 'nom.ni', 'org.ni', 'web.ni',

            // Niger  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ne domains

            // Nigeria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ng', 'edu.ng', 'gov.ng', 'i.ng', 'mil.ng', 'mobi.ng', 'name.ng', 'net.ng', 'org.ng', 'sch.ng',

            // Niue  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .nu domains

            // Norfolk Island  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.nf', 'com.nf', 'firm.nf', 'info.nf', 'net.nf', 'other.nf', 'per.nf', 'rec.nf', 'store.nf', 'web.nf',

            // North Korea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.kp', 'edu.kp', 'gov.kp', 'org.kp', 'rep.kp', 'tra.kp',

            // Northern Mariana Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .mp domains

            // Norway  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aa.no', 'ah.no', 'bu.no', 'dep.no', 'fhs.no', 'fm.no', 'folkebibl.no', 'fylkesbibl.no', 'herad.no', 'hl.no', 'hm.no', 'idrett.no', 'jan-mayen.no', 'kommune.no', 'mil.no', 'mr.no', 'museum.no', 'nl.no', 'nt.no', 'of.no', 'ol.no', 'oslo.no', 'priv.no', 'rl.no', 'sf.no', 'st.no', 'stat.no', 'svalbard.no', 'tm.no', 'tr.no', 'va.no', 'vf.no', 'vgs.no',

            // Oman  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.om', 'com.om', 'edu.om', 'gov.om', 'med.om', 'museum.om', 'net.om', 'org.om', 'pro.om',

            // Pakistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.pk', 'com.pk', 'edu.pk', 'fam.pk', 'gob.pk', 'gok.pk', 'gon.pk', 'gop.pk', 'gos.pk', 'gov.pk', 'info.pk', 'net.pk', 'org.pk', 'web.pk',

            // Palau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'belau.pw', 'co.pw', 'ed.pw', 'go.pw', 'ne.pw', 'or.pw',

            // Palestinian territories  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ps', 'edu.ps', 'gov.ps', 'net.ps', 'org.ps', 'plo.ps', 'sec.ps',

            // Panama  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'abo.pa', 'ac.pa', 'com.pa', 'edu.pa', 'gob.pa', 'ing.pa', 'med.pa', 'net.pa', 'nom.pa', 'org.pa', 'sld.pa',

            // Papua New Guinea  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .pg domains

            // Paraguay  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.py', 'coop.py', 'edu.py', 'gov.py', 'mil.py', 'net.py', 'org.py',

            // People's Republic of China  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.cn', 'ah.cn', 'bj.cn', 'com.cn', 'cq.cn', 'edu.cn', 'fj.cn', 'gd.cn', 'gov.cn', 'gs.cn', 'gx.cn', 'gz.cn', 'ha.cn', 'hb.cn', 'he.cn', 'hi.cn', 'hk.cn', 'hl.cn', 'hn.cn', 'jl.cn', 'js.cn', 'jx.cn', 'ln.cn', 'mil.cn', 'mo.cn', 'net.cn', 'nm.cn', 'nx.cn', 'org.cn', 'qh.cn', 'sc.cn', 'sd.cn', 'sh.cn', 'sn.cn', 'sx.cn', 'tj.cn', 'tw.cn', 'xj.cn', 'xz.cn', 'yn.cn', 'zj.cn',

            // Peru  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.pe', 'edu.pe', 'gob.pe', 'mil.pe', 'net.pe', 'nom.pe', 'org.pe',

            // Philippines  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ph', 'edu.ph', 'gov.ph', 'i.ph', 'mil.ph', 'net.ph', 'ngo.ph', 'org.ph',

            // Pitcairn Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.pn', 'edu.pn', 'gov.pn', 'net.pn', 'org.pn',

            // Poland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'agro.pl', 'aid.pl', 'atm.pl', 'auto.pl', 'biz.pl', 'com.pl', 'edu.pl', 'gmina.pl', 'gov.pl', 'gsm.pl', 'info.pl', 'mail.pl', 'media.pl', 'miasta.pl', 'mil.pl', 'net.pl', 'nieruchomosci.pl', 'nom.pl', 'org.pl', 'pc.pl', 'powiat.pl', 'priv.pl', 'realestate.pl', 'rel.pl', 'sex.pl', 'shop.pl', 'sklep.pl', 'sos.pl', 'szkola.pl', 'targi.pl', 'tm.pl', 'tourism.pl', 'travel.pl', 'turystyka.pl',

            // Portugal  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.pt', 'edu.pt', 'gov.pt', 'int.pt', 'net.pt', 'nome.pt', 'org.pt', 'publ.pt',

            // Puerto Rico  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.pr', 'biz.pr', 'com.pr', 'edu.pr', 'est.pr', 'gov.pr', 'info.pr', 'isla.pr', 'name.pr', 'net.pr', 'org.pr', 'pro.pr', 'prof.pr',

            // Qatar  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.qa', 'edu.qa', 'gov.qa', 'mil.qa', 'name.qa', 'net.qa', 'org.qa', 'sch.qa',

            // Republic of China (Taiwan)  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'club.tw', 'com.tw', 'ebiz.tw', 'edu.tw', 'game.tw', 'gov.tw', 'idv.tw', 'mil.tw', 'net.tw', 'org.tw',

            // Republic of the Congo  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .cg domains

            // Republic of Macedonia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.mk', 'edu.mk', 'gov.mk', 'inf.mk', 'name.mk', 'net.mk', 'org.mk',

            // Reunion  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'asso.re', 'com.re', 'nom.re',

            // Romania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.ro', 'com.ro', 'firm.ro', 'info.ro', 'nom.ro', 'nt.ro', 'org.ro', 'rec.ro', 'store.ro', 'tm.ro', 'www.ro',

            // Russia  2023-10-07  https://en.wikipedia.org/wiki/.ru#Second-level_domains
            'ac.ru', 'adygeya.ru', 'altai.ru', 'amur.ru', 'amursk.ru', 'arkhangelsk.ru', 'astrakhan.ru', 'baikal.ru', 'bashkiria.ru', 'belgorod.ru', 'bir.ru', 'bryansk.ru', 'buryatia.ru', 'cap.ru', 'cbg.ru', 'chel.ru', 'chelyabinsk.ru', 'chita.ru', 'chukotka.ru', 'cmw.ru', 'com.ru', 'dagestan.ru', 'e-burg.ru', 'edu.ru', 'fareast.ru', 'gov.ru', 'grozny.ru', 'int.ru', 'irkutsk.ru', 'ivanovo.ru', 'izhevsk.ru', 'jamal.ru', 'jar.ru', 'joshkar-ola.ru', 'k-uralsk.ru', 'kalmykia.ru', 'kaluga.ru', 'kamchatka.ru', 'karelia.ru', 'kazan.ru', 'kchr.ru', 'kemerovo.ru', 'khabarovsk.ru', 'khakassia.ru', 'khv.ru', 'kirov.ru', 'kms.ru', 'koenig.ru', 'komi.ru', 'kostroma.ru', 'krasnoyarsk.ru', 'kuban.ru', 'kurgan.ru', 'kursk.ru', 'kustanai.ru', 'kuzbass.ru', 'lipetsk.ru', 'magadan.ru', 'magnitka.ru', 'mari-el.ru', 'mari.ru', 'marine.ru', 'mil.ru', 'mordovia.ru', 'mos.ru', 'mosreg.ru', 'msk.ru', 'murmansk.ru', 'mytis.ru', 'nakhodka.ru', 'nalchik.ru', 'net.ru', 'nkz.ru', 'nnov.ru', 'norilsk.ru', 'nov.ru', 'novosibirsk.ru', 'nsk.ru', 'omsk.ru', 'orenburg.ru', 'org.ru', 'oryol.ru', 'oskol.ru', 'penza.ru', 'perm.ru', 'pp.ru', 'pskov.ru', 'ptz.ru', 'pyatigorsk.ru', 'rnd.ru', 'rubtsovsk.ru', 'ryazan.ru', 'sakhalin.ru', 'samara.ru', 'saratov.ru', 'simbirsk.ru', 'smolensk.ru', 'snz.ru', 'spb.ru', 'stavropol.ru', 'stv.ru', 'surgut.ru', 'syzran.ru', 'tambov.ru', 'tatarstan.ru', 'tlt.ru', 'tom.ru', 'tomsk.ru', 'tsaritsyn.ru', 'tsk.ru', 'tula.ru', 'tuva.ru', 'tver.ru', 'tyumen.ru', 'udm.ru', 'udmurtia.ru', 'ulan-ude.ru', 'vdonsk.ru', 'vladikavkaz.ru', 'vladimir.ru', 'vladivostok.ru', 'volgograd.ru', 'vologda.ru', 'voronezh.ru', 'vrn.ru', 'vyatka.ru', 'yakutia.ru', 'yamal.ru', 'yaroslavl.ru', 'yekaterinburg.ru', 'yuzhno-sakhalinsk.ru',

            // Rwanda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.rw', 'co.rw', 'coop.rw', 'gov.rw', 'mil.rw', 'net.rw', 'org.rw',

            // Saint Helena  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sh', 'gov.sh', 'mil.sh', 'net.sh', 'org.sh',

            // Saint Kitts and Nevis  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'edu.kn', 'gov.kn', 'net.kn', 'org.kn',

            // Saint Lucia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.lc', 'com.lc', 'edu.lc', 'gov.lc', 'net.lc', 'org.lc',

            // Saint Vincent and the Grenadines  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.vc', 'edu.vc', 'gov.vc', 'mil.vc', 'net.vc', 'org.vc',

            // Saint-Pierre and Miquelon  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .pm domains

            // Samoa  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ws', 'edu.ws', 'gov.ws', 'net.ws', 'org.ws',

            // San Marino  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .sm domains

            // Sao Tome and Principe  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.st', 'com.st', 'consulado.st', 'edu.st', 'embaixada.st', 'mil.st', 'net.st', 'org.st', 'principe.st', 'saotome.st', 'store.st',

            // Saudi Arabia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sa', 'edu.sa', 'gov.sa', 'med.sa', 'net.sa', 'org.sa', 'pub.sa', 'sch.sa',

            // Senegal  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'art.sn', 'com.sn', 'edu.sn', 'gouv.sn', 'org.sn', 'perso.sn', 'univ.sn',

            // Serbia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.rs', 'co.rs', 'edu.rs', 'gov.rs', 'in.rs', 'org.rs',

            // Seychelles  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sc', 'edu.sc', 'gov.sc', 'net.sc', 'org.sc',

            // Sierra Leone  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sl', 'edu.sl', 'gov.sl', 'net.sl', 'org.sl',

            // Singapore  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sg', 'edu.sg', 'gov.sg', 'net.sg', 'org.sg', 'per.sg',

            // Sint Maarten (Dutch)  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'gov.sx',

            // Slovakia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .sk domains

            // Slovenia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .si domains

            // Solomon Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sb', 'edu.sb', 'gov.sb', 'net.sb', 'org.sb',

            // Somalia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.so', 'edu.so', 'gov.so', 'me.so', 'net.so', 'org.so',

            // South Africa  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.za', 'agric.za', 'alt.za', 'co.za', 'edu.za', 'gov.za', 'grondar.za', 'law.za', 'mil.za', 'net.za', 'ngo.za', 'nic.za', 'nis.za', 'nom.za', 'org.za', 'school.za', 'tm.za', 'web.za',

            // South Georgia and the South Sandwich Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gs domains

            // South Korea  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.kr', 'busan.kr', 'chungbuk.kr', 'chungnam.kr', 'co.kr', 'daegu.kr', 'daejeon.kr', 'es.kr', 'gangwon.kr', 'go.kr', 'gwangju.kr', 'gyeongbuk.kr', 'gyeonggi.kr', 'gyeongnam.kr', 'hs.kr', 'incheon.kr', 'jeju.kr', 'jeonbuk.kr', 'jeonnam.kr', 'kg.kr', 'mil.kr', 'ms.kr', 'ne.kr', 'or.kr', 'pe.kr', 're.kr', 'sc.kr', 'seoul.kr', 'ulsan.kr',

            // South Sudan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'biz.ss', 'com.ss', 'edu.ss', 'gov.ss', 'me.ss', 'net.ss', 'org.ss', 'sch.ss',

            // Spain  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'com.es', 'edu.es', 'gob.es', 'nom.es', 'org.es',

            // Sri Lanka  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.lk', 'assn.lk', 'com.lk', 'edu.lk', 'gov.lk', 'grp.lk', 'hotel.lk', 'int.lk', 'ltd.lk', 'net.lk', 'ngo.lk', 'org.lk', 'sch.lk', 'soc.lk', 'web.lk',

            // Sudan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sd', 'edu.sd', 'gov.sd', 'info.sd', 'med.sd', 'net.sd', 'org.sd', 'tv.sd',

            // Suriname  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .sr domains

            // Sweden  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'a.se', 'ac.se', 'b.se', 'bd.se', 'brand.se', 'c.se', 'd.se', 'e.se', 'f.se', 'fh.se', 'fhsk.se', 'fhv.se', 'g.se', 'h.se', 'i.se', 'k.se', 'komforb.se', 'kommunalforbund.se', 'komvux.se', 'l.se', 'lanbib.se', 'm.se', 'n.se', 'naturbruksgymn.se', 'o.se', 'org.se', 'p.se', 'parti.se', 'pp.se', 'press.se', 'r.se', 's.se', 't.se', 'tm.se', 'u.se', 'w.se', 'x.se', 'y.se', 'z.se',

            // Switzerland  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .ch domains

            // Syria  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.sy', 'edu.sy', 'gov.sy', 'mil.sy', 'net.sy', 'org.sy',

            // Tajikistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.tj', 'biz.tj', 'co.tj', 'com.tj', 'edu.tj', 'go.tj', 'gov.tj', 'int.tj', 'mil.tj', 'name.tj', 'net.tj', 'nic.tj', 'org.tj', 'test.tj', 'web.tj',

            // Tanzania  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.tz', 'co.tz', 'go.tz', 'hotel.tz', 'info.tz', 'me.tz', 'mil.tz', 'mobi.tz', 'ne.tz', 'or.tz', 'sc.tz', 'tv.tz',

            // Thailand  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.th', 'co.th', 'go.th', 'in.th', 'mi.th', 'net.th', 'or.th',

            // The Gambia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .gm domains

            // Togo  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tg domains

            // Tokelau  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tk domains

            // Tonga  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.to', 'edu.to', 'gov.to', 'mil.to', 'net.to', 'org.to',

            // Trinidad and Tobago  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'aero.tt', 'biz.tt', 'co.tt', 'com.tt', 'coop.tt', 'edu.tt', 'gov.tt', 'info.tt', 'int.tt', 'jobs.tt', 'mobi.tt', 'museum.tt', 'name.tt', 'net.tt', 'org.tt', 'pro.tt', 'travel.tt',

            // Tunisia  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.tn', 'ens.tn', 'fin.tn', 'gov.tn', 'ind.tn', 'info.tn', 'intl.tn', 'mincom.tn', 'nat.tn', 'net.tn', 'org.tn', 'perso.tn', 'tourism.tn',

            // Turkey  2023-10-07  https://www.nic.tr/
            'av.tr', 'bbs.tr', 'bel.tr', 'biz.tr', 'com.tr', 'dr.tr', 'edu.tr', 'gen.tr', 'gov.tr', 'info.tr', 'k12.tr', 'kep.tr', 'mil.tr', 'name.tr', 'net.tr', 'org.tr', 'pol.tr', 'tel.tr', 'tsk.tr', 'tv.tr', 'web.tr',

            // Turkmenistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.tm', 'com.tm', 'edu.tm', 'gov.tm', 'mil.tm', 'net.tm', 'nom.tm', 'org.tm',

            // Turks and Caicos Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tc domains

            // Tuvalu  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .tv domains

            // Uganda  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ug', 'co.ug', 'com.ug', 'go.ug', 'ne.ug', 'or.ug', 'org.ug', 'sc.ug',

            // Ukraine  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'cherkassy.ua', 'cherkasy.ua', 'chernigov.ua', 'chernihiv.ua', 'chernivtsi.ua', 'chernovtsy.ua', 'ck.ua', 'cn.ua', 'com.ua', 'cr.ua', 'crimea.ua', 'cv.ua', 'dn.ua', 'dnepropetrovsk.ua', 'dnipropetrovsk.ua', 'donetsk.ua', 'dp.ua', 'edu.ua', 'gov.ua', 'if.ua', 'in.ua', 'ivano-frankivsk.ua', 'kh.ua', 'kharkiv.ua', 'kharkov.ua', 'kherson.ua', 'khmelnitskiy.ua', 'khmelnytskyi.ua', 'kiev.ua', 'kirovograd.ua', 'km.ua', 'kr.ua', 'kropyvnytskyi.ua', 'krym.ua', 'ks.ua', 'kv.ua', 'kyiv.ua', 'lg.ua', 'lt.ua', 'lugansk.ua', 'luhansk.ua', 'lutsk.ua', 'lv.ua', 'lviv.ua', 'mk.ua', 'mykolaiv.ua', 'net.ua', 'nikolaev.ua', 'od.ua', 'odesa.ua', 'odessa.ua', 'org.ua', 'pl.ua', 'poltava.ua', 'rivne.ua', 'rovno.ua', 'rv.ua', 'sb.ua', 'sebastopol.ua', 'sevastopol.ua', 'sm.ua', 'sumy.ua', 'te.ua', 'ternopil.ua', 'uz.ua', 'uzhgorod.ua', 'uzhhorod.ua', 'vinnica.ua', 'vinnytsia.ua', 'vn.ua', 'volyn.ua', 'yalta.ua', 'zakarpattia.ua', 'zaporizhzhe.ua', 'zaporizhzhia.ua', 'zhitomir.ua', 'zhytomyr.ua', 'zp.ua', 'zt.ua',

            // United Arab Emirates  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.ae', 'co.ae', 'gov.ae', 'mil.ae', 'net.ae', 'org.ae', 'sch.ae',

            // United Kingdom  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.uk', 'bl.uk', 'co.uk', 'gov.uk', 'judiciary.uk', 'ltd.uk', 'me.uk', 'mil.uk', 'mod.uk', 'net.uk', 'nhs.uk', 'nic.uk', 'org.uk', 'parliament.uk', 'plc.uk', 'police.uk', 'rct.uk', 'royal.uk', 'sch.uk', 'ukaea.uk',

            // United States of America  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ak.us', 'al.us', 'ar.us', 'as.us', 'az.us', 'ca.us', 'co.us', 'ct.us', 'dc.us', 'de.us', 'dni.us', 'fed.us', 'fl.us', 'ga.us', 'gu.us', 'hi.us', 'ia.us', 'id.us', 'il.us', 'in.us', 'isa.us', 'kids.us', 'ks.us', 'ky.us', 'la.us', 'ma.us', 'md.us', 'me.us', 'mi.us', 'mn.us', 'mo.us', 'ms.us', 'mt.us', 'nc.us', 'nd.us', 'ne.us', 'nh.us', 'nj.us', 'nm.us', 'nsn.us', 'nv.us', 'ny.us', 'oh.us', 'ok.us', 'or.us', 'pa.us', 'pr.us', 'ri.us', 'sc.us', 'sd.us', 'tn.us', 'tx.us', 'ut.us', 'va.us', 'vi.us', 'vt.us', 'wa.us', 'wi.us', 'wv.us', 'wy.us',

            // University of Curacao  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.cw', 'edu.cw', 'net.cw', 'org.cw',

            // Uruguay  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.uy', 'edu.uy', 'gub.uy', 'mil.uy', 'net.uy', 'org.uy',

            // U.S. Virgin Islands  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.vi', 'com.vi', 'k12.vi', 'net.vi', 'org.vi',

            // Uzbekistan  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'co.uz', 'com.uz', 'net.uz', 'org.uz',

            // Vanuatu  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.vu', 'edu.vu', 'net.vu', 'org.vu',

            // Vatican City  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .va domains

            // Venezuela  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'arts.ve', 'bib.ve', 'co.ve', 'com.ve', 'e12.ve', 'edu.ve', 'firm.ve', 'gob.ve', 'gov.ve', 'info.ve', 'int.ve', 'mil.ve', 'net.ve', 'nom.ve', 'org.ve', 'rar.ve', 'rec.ve', 'store.ve', 'tec.ve', 'web.ve',

            // Vietnam  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.vn', 'ai.vn', 'biz.vn', 'com.vn', 'edu.vn', 'gov.vn', 'health.vn', 'id.vn', 'info.vn', 'int.vn', 'io.vn', 'name.vn', 'net.vn', 'org.vn', 'pro.vn',

            // Wallis and Futuna  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            // no information found for .wf domains

            // Yemen  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'com.ye', 'edu.ye', 'gov.ye', 'mil.ye', 'net.ye', 'org.ye',

            // Zambia  2023-10-07  https://en.wikipedia.org/wiki/Second-level_domain
            'ac.zm', 'biz.zm', 'co.zm', 'com.zm', 'edu.zm', 'gov.zm', 'info.zm', 'mil.zm', 'net.zm', 'org.zm', 'sch.zm',

            // Zimbabwe  2023-10-07  https://publicsuffix.org/list/public_suffix_list.dat
            'ac.zw', 'co.zw', 'gov.zw', 'mil.zw', 'org.zw',
        ] // country_code
    } // second_level_domains
} // reference