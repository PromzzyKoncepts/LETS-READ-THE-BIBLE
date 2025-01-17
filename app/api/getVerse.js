import axios from 'axios';

const BIBLE_ID = '61fd76eafa1577c2-02';
const VERSES = [
  'JER.29.11',
  'PSA.23',
  '1COR.4.4-8',
  'PHP.4.13',
  'JHN.3.16',
  'ROM.8.28',
  'ISA.41.10',
  'PSA.46.1',
  'GAL.5.22-23',
  'HEB.11.1',
  '2TI.1.7',
  '1COR.10.13',
  'PRO.22.6',
  'ISA.40.31',
  'JOS.1.9',
  'HEB.12.2',
  'MAT.11.28',
  'ROM.10.9-10',
  'PHP.2.3-4',
  'MAT.5.43-44',
];
console.log("resssssppoooonnnsssseee")


export default async function handler(req, res) {
  try {
    const verseIndex = Math.floor(Math.random() * VERSES.length);
    const verseID = VERSES[verseIndex];

    const response = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${verseID}`,
      {
        headers: {
          'api-key': '846dce895759100a3907047a4fdfd18b',
        },
      }
    );

    console.log(response, "resssssppoooonnnsssseee")

    const verseData = response.data;
    res.status(200).json({ verseID, verseData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch verse' });
  }
}
