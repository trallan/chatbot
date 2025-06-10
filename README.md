# Chattbot-applikation

En enkel och användarvänlig chattbot som svarar på kundfrågor med hjälp av en FAQ-databas och fuzzy matchning (Fuse.js). Perfekt för att automatisera vanliga kundfrågor och förbättra kundservicen.

## Funktioner
- **Fråga och svar**: Boten ger svar baserat på en FAQ-databas.
- **Synonymmatchning**: Frågor kan ställas med varierande formuleringar tack vare fuzzy matchning.
- **Enter-knappens funktionalitet**: Meddelanden skickas med både Enter-tangenten och "Skicka"-knappen.
- **Responsivt gränssnitt**: Anpassat för både desktop och mobila enheter.

## Teknologi
- **Astro**: Frontend-ramverket för att bygga webbplatsen.
- **React**: Komponenthantering för chattbottens gränssnitt.
- **Fuse.js**: Fuzzy search-bibliotek för flexibel textmatchning.
- **JSON**: Databas med frågor och svar.

## Installation
Följ dessa steg för att köra applikationen lokalt:

1. Klona detta repository:
    ```bash
    git clone https://github.com/trallan/chatbot.git
    cd chatbot
    ```

2. Installera nödvändiga beroenden:
    ```bash
    npm install
    ```

3. Starta utvecklingsservern:
    ```bash
    npm run dev
    ```

4. Öppna din webbläsare och navigera till `http://localhost:3000`.

## FAQ-databas
FAQ-databasen är en JSON-fil som innehåller frågor, synonymer och svar. Exempel:
```json
[
    {
        "question": "Vad är era öppettider?",
        "synonyms": ["Har ni öppet idag?", "När stänger ni?"],
        "answer": "Vi har öppet måndag till fredag mellan 09:00 och 18:00."
    }
]
