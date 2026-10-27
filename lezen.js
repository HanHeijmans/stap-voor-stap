// Stap voor Stap reading practice. Each sentence or story unlocks once every word it uses has been learned.
//
// Format, one sentence per line:   Dutch | English | word keys
//   Word keys, comma-separated, give for each word of the sentence (in order) the woorden.js entry it
//   comes from, written exactly as there ("drinken" for drinkt, "het huis" for huizen, "zijn·2" for the
//   second "zijn", meaning his). Use - for words that are not in the list (names, de, te).
//   ## Sentences   starts the sentence bank
//   # Title        starts a short story; its lines follow
window.LEZEN = `
## Sentences
Ik drink koffie. | I drink coffee. | ik, drinken, de koffie
Wij eten brood. | We eat bread. | wij/we, eten, het brood
Hij is mijn vader. | He is my father. | hij, zijn, mijn, de vader
Zij heeft twee kinderen. | She has two children. | zij/ze, hebben, twee, het kind
Mijn zus woont in Amsterdam. | My sister lives in Amsterdam. | mijn, de zus, wonen, in, -
Het huis is groot. | The house is big. | het, het huis, zijn, groot
Ik heb geen tijd. | I have no time. | ik, hebben, geen, de tijd
Waar is het station? | Where is the station? | waar, zijn, het, het station
Hoe laat is het? | What time is it? | hoe laat, hoe laat, zijn, het
Wij gaan morgen naar huis. | We are going home tomorrow. | wij/we, gaan, morgen, naar, het huis
Ik wil graag een biertje. | I'd like a beer. | ik, willen, graag, een, het bier
Mijn moeder drinkt thee. | My mother drinks tea. | mijn, de moeder, drinken, de thee
Dat is niet goed. | That is not good. | dat, zijn, niet, goed
Zij komt vandaag niet. | She isn't coming today. | zij/ze, komen, vandaag, niet
Wat doe je vanavond? | What are you doing tonight? | wat, doen, jij/je, vanavond
Ik weet het niet. | I don't know. | ik, weten, het, niet
Kun je mij helpen? | Can you help me? | kunnen, jij/je, mij/me, helpen
Ik begrijp het niet. | I don't understand it. | ik, begrijpen, het, niet
Hij spreekt goed Nederlands. | He speaks Dutch well. | hij, spreken, goed, Nederlands
Wij hebben een nieuwe fiets. | We have a new bike. | wij/we, hebben, een, nieuw, de fiets
De trein vertrekt om acht uur. | The train leaves at eight o'clock. | -, de trein, vertrekken, om, acht, het uur
Het regent vandaag. | It's raining today. | het, regenen, vandaag
In de winter is het koud. | It's cold in winter. | in, -, de winter, zijn, het, koud
Ik ga met de fiets naar mijn werk. | I cycle to work. | ik, gaan, met, -, de fiets, naar, mijn, het werk
Mijn broer werkt in een ziekenhuis. | My brother works in a hospital. | mijn, de broer, werken, in, een, het ziekenhuis
Ik sta om zeven uur op. | I get up at seven o'clock. | ik, opstaan, om, zeven, het uur, opstaan
Hij belt mij morgen op. | He'll phone me tomorrow. | hij, opbellen, mij/me, morgen, opbellen
We spreken om acht uur af. | We're meeting at eight o'clock. | wij/we, afspreken, om, acht, het uur, afspreken
Omdat het regent, blijf ik thuis. | Because it's raining, I'm staying at home. | omdat, het, regenen, blijven, ik, thuis
Ik denk dat zij ziek is. | I think she is ill. | ik, denken, dat, zij/ze, ziek, zijn
Gisteren heb ik een boek gelezen. | Yesterday I read a book. | gisteren, hebben, ik, een, het boek, lezen
Wij zijn naar de markt gegaan. | We went to the market. | wij/we, zijn, naar, -, de markt, gaan
Heb je honger? | Are you hungry? | honger hebben, jij/je, honger hebben
De soep is heel lekker. | The soup is really tasty. | -, de soep, zijn, heel, lekker
Mag ik de rekening? | Could I have the bill? | mogen, ik, -, de rekening
Kan ik pinnen? | Can I pay by card? | kunnen, ik, pinnen
Hoeveel kost dit? | How much does this cost? | hoeveel, kosten, dit
Dat is te duur. | That's too expensive. | dat, zijn, -, duur
Het is hier heel gezellig. | It's really cosy here. | het, zijn, hier, heel, gezellig
Zij is verliefd op hem. | She is in love with him. | zij/ze, zijn, verliefd, op, hem
Mijn ouders wonen in een klein dorp. | My parents live in a small village. | mijn, de ouders, wonen, in, een, klein, het dorp
De kinderen spelen buiten. | The children are playing outside. | -, het kind, spelen, buiten
Wij gaan in de zomer naar zee. | We're going to the seaside in summer. | wij/we, gaan, in, -, de zomer, naar, de zee
Ik heb hoofdpijn en koorts. | I have a headache and a fever. | ik, hebben, de hoofdpijn, en, de koorts
Je moet naar de dokter gaan. | You should go to the doctor. | jij/je, moeten, naar, -, de dokter, gaan
Hij is gisteren verhuisd. | He moved house yesterday. | hij, zijn, gisteren, verhuizen
Wat betekent dit woord? | What does this word mean? | wat, betekenen, dit, het woord
Kun je dat herhalen? | Can you repeat that? | kunnen, jij/je, dat, herhalen
Ik ben het met je eens. | I agree with you. | ik, het eens zijn, het eens zijn, met, jij/je, het eens zijn
Volgende week heb ik vakantie. | Next week I'm on holiday. | volgende week, volgende week, hebben, ik, de vakantie
Hoewel het koud is, gaan we fietsen. | Although it's cold, we're going cycling. | hoewel, het, koud, zijn, gaan, wij/we, fietsen
Zodra de trein aankomt, bel ik je. | As soon as the train arrives, I'll call you. | zodra, -, de trein, aankomen, bellen, ik, jij/je
Op Koningsdag is alles oranje. | On King's Day everything is orange. | op, Koningsdag, zijn, alles, oranje
Bij de gracht staan oude huizen. | There are old houses by the canal. | bij, -, de gracht, staan, oud, het huis
Het spijt me, ik ben te laat. | I'm sorry, I'm late. | het spijt me, het spijt me, het spijt me, ik, zijn, te laat, te laat
Succes met je examen! | Good luck with your exam! | succes, met, jouw, het examen
Hoe gaat het met je? | How are you? | hoe gaat het?, hoe gaat het?, hoe gaat het?, met, jij/je
Ik heb zin in een kopje koffie. | I feel like a cup of coffee. | ik, zin hebben in, zin hebben in, zin hebben in, een, het kopje, de koffie
Het valt mee. | It's not as bad as I thought. | het valt mee, het valt mee, het valt mee
Wanneer begint de les? | When does the lesson start? | wanneer, beginnen, -, de les

# Een dag in Amsterdam
Vandaag gaan wij naar Amsterdam. | Today we are going to Amsterdam. | vandaag, gaan, wij/we, naar, -
We gaan met de trein. | We're going by train. | wij/we, gaan, met, -, de trein
De trein vertrekt om negen uur. | The train leaves at nine o'clock. | -, de trein, vertrekken, om, negen, het uur
In Amsterdam zien we de grachten. | In Amsterdam we see the canals. | in, -, zien, wij/we, -, de gracht
Daarna eten we in een restaurant. | After that we eat in a restaurant. | daarna, eten, wij/we, in, een, het restaurant
Het eten is heel lekker. | The food is really tasty. | het, het eten, zijn, heel, lekker
Om tien uur gaan we moe naar huis. | At ten o'clock we go home, tired. | om, tien, het uur, gaan, wij/we, moe, naar, het huis

# Mijn familie
Mijn naam is Anna. | My name is Anna. | mijn, de naam, zijn, -
Ik woon met mijn gezin in Utrecht. | I live with my family in Utrecht. | ik, wonen, met, mijn, het gezin, in, -
Mijn man werkt in een ziekenhuis. | My husband works in a hospital. | mijn, de man, werken, in, een, het ziekenhuis
Wij hebben twee kinderen, een zoon en een dochter. | We have two children, a son and a daughter. | wij/we, hebben, twee, het kind, een, de zoon, en, een, de dochter
Onze zoon is tien jaar oud. | Our son is ten years old. | ons/onze, de zoon, zijn, tien, het jaar, oud
Onze dochter gaat naar school. | Our daughter goes to school. | ons/onze, de dochter, gaan, naar, de school
In het weekend fietsen we samen. | At the weekend we cycle together. | in, het, het weekend, fietsen, wij/we, samen

# Bij de dokter
Gisteren was ik ziek. | Yesterday I was ill. | gisteren, zijn, ik, ziek
Ik had hoofdpijn en koorts. | I had a headache and a fever. | ik, hebben, de hoofdpijn, en, de koorts
Ik heb de dokter gebeld. | I phoned the doctor. | ik, hebben, -, de dokter, bellen
Ik kon om tien uur komen. | I could come at ten o'clock. | ik, kunnen, om, tien, het uur, komen
De dokter zei: "Je bent verkouden." | The doctor said: "You have a cold." | -, de dokter, zeggen, jij/je, zijn, verkouden
"Drink veel water en slaap goed." | "Drink lots of water and sleep well." | drinken, veel, het water, en, slapen, goed
Vandaag voel ik me al beter. | Today I already feel better. | vandaag, voelen, ik, -, al, beter worden

# Het Nederlandse weer
In Nederland regent het vaak. | In the Netherlands it often rains. | in, Nederland, regenen, het, vaak
Veel mensen hebben een goede jas. | Many people have a good coat. | veel, de mens, hebben, een, goed, de jas
In de zomer is het soms warm. | In summer it is sometimes warm. | in, -, de zomer, zijn, het, soms, warm
Dan zitten we buiten in de zon. | Then we sit outside in the sun. | dan, zitten, wij/we, buiten, in, -, de zon
In de winter is het koud en donker. | In winter it is cold and dark. | in, -, de winter, zijn, het, koud, en, donker
Maar met een kopje thee is het altijd gezellig. | But with a cup of tea it's always cosy. | maar, met, een, het kopje, de thee, zijn, het, altijd, gezellig
`;
