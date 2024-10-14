<template>
    <div class="container">
        <h3 class="title">Privatlivspolitik</h3>
        <ol>
            <li>
                <h4 class="title is-4 mb-0">
                    Indledning
                </h4>
                <p>
                    Vi hos Det grønlandske Patienthjem tager beskyttelsen af dine personlige oplysninger meget seriøst
                    og overholder gældende databeskyttelseslove, herunder EU's General Data Protection Regulation
                    (GDPR). I denne politik forklarer vi, hvordan vi indsamler, bruger, opbevarer og beskytter dine
                    persondata.
                </p>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Behandling af persondata
                </h4>
                <p>
                    Dine oplysninger behandles udelukkende inden for organisationen og deles ikke med tredjepart uden
                    dit udtrykkelige samtykke, medmindre det er påkrævet ved lov. Vi sikrer, at alle, der har adgang til
                    dine data, er underlagt tavshedspligt og databeskyttelsesregler.
                </p>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Indsamlede oplysninger
                </h4>
                <p class="mb-0 pb-0">
                    Vi indsamler kun de oplysninger, der er nødvendige for at levere vores tjenester, herunder:
                </p>
                <ul>
                    <li>Navn</li>
                    <li>Kontaktinformation</li>
                    <li>Oplysninger om dine lægeaftaler (tid og sted)</li>
                    <li>CPR nr.</li>
                </ul>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Behandling af personfølsomme oplysninger
                </h4>
                <p>
                    Vi håndterer personfølsomme oplysninger med ekstra forsigtighed. CPR-numre, som vi kan være nødt til
                    at indsamle i forbindelse med specifikke tjenester, vil blive slettet straks efter, at formålet med
                    indsamlingen er opfyldt. For eksempel slettes CPR-numre umiddelbart efter, at en kørsel eller aftale
                    er fuldført.
                </p>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Opbevaring og sletning af data
                </h4>
                <p>
                    Alle andre personlige oplysninger opbevares i maksimalt 30 dage efter, at den oprindelige behandling
                    er afsluttet, hvorefter de automatisk slettes fra vores systemer, medmindre en længere
                    opbevaringsperiode er påkrævet ved lov.
                </p>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Dine rettigheder
                </h4>
                <p my-0>
                    Som registreret har du en række rettigheder i forhold til dine persondata:
                </p>
                <ul>
                    <li>
                        Ret til adgang: Du kan anmode om en kopi af de oplysninger, vi har om dig.
                    </li>
                    <li>
                        Ret til rettelse: Hvis du mener, at dine oplysninger er forkerte eller ufuldstændige, kan du
                        bede om at få dem rettet.
                    </li>
                    <li>
                        Ret til sletning: Under visse omstændigheder kan du bede om at få slettet dine oplysninger.
                    </li>
                    <li>
                        Ret til indsigelse: Du har ret til at gøre indsigelse mod visse former for behandling af dine
                        personoplysninger.
                    </li>
                </ul>
                <p>
                    For at udøve dine rettigheder kan du kontakte os på dgpshv@peqqik.gl.
                </p>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Datasikkerhed
                </h4>
                <p>
                    Vi anvender passende tekniske og organisatoriske foranstaltninger for at beskytte dine oplysninger
                    mod uautoriseret adgang, tab eller misbrug. Dette inkluderer kryptering af følsomme data og sikre
                    procedurer for adgang til oplysningerne.
                </p>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Kontakt
                </h4>
                <p>
                    Hvis du har spørgsmål til vores privatlivspolitik eller den måde, vi behandler dine persondata på,
                    kan du kontakte os på dgpshv@peqqik.gl eller +45 3826 4600.
                </p>
            </li>
            <li>
                <h4 class="title is-4 mb-0">
                    Ændringer i privatlivspolitikken
                </h4>
                <p>
                    Vi forbeholder os retten til at opdatere denne politik fra tid til anden for at afspejle ændringer i
                    vores praksis eller gældende lovgivning. Den seneste version vil altid være tilgængelig på vores
                    hjemmeside.


                </p>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: "PrivacyPage",
}
</script>

<style scoped>
ul,
ol {
    padding-left: 1.5rem;
    /* Optional: Adds some indentation to lists */
    margin-top: 0.5rem;
    /* Adds consistent space before lists */
    margin-bottom: 0.5rem;
    /* Adds consistent space after lists */
}

li {
    margin-bottom: 1rem;
    /* Adds space between list items */
}

h4 {
    margin-bottom: 0.5rem;
    /* Reduces space after the heading */
}

p {
    margin: 0;
    /* Ensures paragraphs don't add extra space */
    padding: 0;
}

.container {
    padding: 1rem;
    /* Adds consistent padding inside the container */
}
</style>
