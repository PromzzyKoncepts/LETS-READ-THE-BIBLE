// app/topical/page.jsx
"use client";
import { useState, useMemo, useEffect, useRef } from "react";

const topicsData = [
  {
    id: 1,
    title: "RAPTURE",
    category: "God & Faith",
    icon: "☁️",
    verses: [
      {
        reference: "1 Thessalonians 4:16-17",
        text: "For the Lord himself shall descend from heaven with a shout... and the dead in Christ shall rise first: Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air...",
      },
      {
        reference: "1 Corinthians 15:51-52",
        text: "Behold, I show you a mystery; We shall not all sleep, but we shall all be changed, In a moment, in the twinkling of an eye... and the dead shall be raised incorruptible, and we shall be changed.",
      },
      {
        reference: "John 14:2-3",
        text: "I go to prepare a place for you... I will come again, and receive you unto myself; that where I am, there ye may be also.",
      },
      {
        reference: "Philippians 3:20-21",
        text: "For our conversation is in heaven... Who shall change our vile body, that it may be fashioned like unto his glorious body...",
      },
      {
        reference: "Titus 2:13",
        text: "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.",
      },
      {
        reference: "Matthew 24:40-42",
        text: "Then shall two be in the field; the one shall be taken, and the other left... Watch therefore: for ye know not what hour your Lord doth come.",
      },
      {
        reference: "Revelation 3:10",
        text: "You have followed my teaching about not giving up. So I will keep you from the time of trouble that will come to the whole world.",
      },
    ],
  },
  {
    id: 2,
    title: "LOVE",
    category: "Christian Living",
    icon: "❤️",
    verses: [
      {
        reference: "1 Corinthians 13:4-7",
        text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.",
      },
      {
        reference: "John 15:13",
        text: "Greater love has no one than this: to lay down one's life for one's friends.",
      },
      {
        reference: "1 John 4:7-12 & 16",
        text: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God. Whoever does not love does not know God, because God is love.",
      },
      {
        reference: "Romans 5:5 & 8",
        text: "The love of God has been poured out in our hearts by the Holy Spirit who was given to us. But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.",
      },
      {
        reference: "Matthew 22:37-39",
        text: "You shall love the Lord your God with all your heart, with all your soul, and with all your mind. And the second is like it: You shall love your neighbor as yourself.",
      },
      { reference: "1 Corinthians 16:14", text: "Do everything in love." },
    ],
  },
  {
    id: 3,
    title: "PRAYER",
    category: "Spiritual Disciplines",
    icon: "🙏",
    verses: [
      {
        reference: "Philippians 4:6",
        text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
      },
      {
        reference: "Mark 11:24",
        text: "Therefore I tell you, whatever you ask in prayer, believe that you have received it, and it will be yours.",
      },
      {
        reference: "Romans 8:26",
        text: "Likewise the Spirit helps us in our weakness. For we do not know what to pray for as we ought, but the Spirit himself intercedes for us with groanings too deep for words.",
      },
      {
        reference: "Matthew 6:6",
        text: "But when you pray, go into your room and shut the door and pray to your Father who is in secret. And your Father who sees in secret will reward you.",
      },
      {
        reference: "James 5:16",
        text: "The prayer of a righteous person has great power as it is working.",
      },
      {
        reference: "1 Thessalonians 5:16-18",
        text: "Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
      },
    ],
  },
  {
    id: 4,
    title: "HEALING",
    category: "Trials & Growth",
    icon: "🩺",
    verses: [
      {
        reference: "Psalm 103:2-3",
        text: "Praise the Lord, my soul, and forget not all his benefits — who forgives all your sins and heals all your diseases.",
      },
      {
        reference: "James 5:14-15",
        text: "Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord. And the prayer offered in faith will make the sick person well.",
      },
      {
        reference: "Isaiah 40:29",
        text: "He gives strength to the weary and increases the power of the weak.",
      },
      {
        reference: "Psalm 147:3",
        text: "He heals the brokenhearted and binds up their wounds.",
      },
      {
        reference: "Mark 5:34",
        text: "Daughter, your faith has healed you. Go in peace and be freed from your suffering.",
      },
      {
        reference: "Proverbs 17:22",
        text: "A joyful heart is good medicine, but a crushed spirit dries up the bones.",
      },
      {
        reference: "Psalm 107:20",
        text: "He sent His word and healed them, And delivered them from their destructions.",
      },
    ],
  },
  {
    id: 5,
    title: "RIGHTEOUSNESS",
    category: "Christian Living",
    icon: "⚖️",
    verses: [
      {
        reference: "Malachi 4:2",
        text: "But to you who fear My name The Sun of Righteousness shall arise With healing in His wings.",
      },
      {
        reference: "Proverbs 21:21",
        text: "Whoever pursues righteousness and love finds life, prosperity, and honor.",
      },
      {
        reference: "Psalm 11:7",
        text: "For the Lord is righteous, he loves justice; the upright will see his face.",
      },
      {
        reference: "Romans 3:22",
        text: "This righteousness is given through faith in Jesus Christ to all who believe.",
      },
      {
        reference: "2 Corinthians 5:21",
        text: "God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.",
      },
    ],
  },
  {
    id: 6,
    title: "FAITH",
    category: "God & Faith",
    icon: "✨",
    verses: [
      {
        reference: "James 1:6",
        text: "But when you ask, you must believe and not doubt, because the one who doubts is like a wave of the sea, blown and tossed by the wind.",
      },
      {
        reference: "Matthew 17:20",
        text: "If you have faith as small as a mustard seed, you can say to this mountain, Move from here to there, and it will move. Nothing will be impossible for you.",
      },
      {
        reference: "2 Corinthians 5:7",
        text: "For we live by faith, not by sight.",
      },
      {
        reference: "Romans 10:17",
        text: "Faith comes from hearing the message, and the message is heard through the word about Christ.",
      },
      {
        reference: "Hebrews 11:1",
        text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
      },
    ],
  },
  {
    id: 7,
    title: "EXCELLENCE",
    category: "Christian Living",
    icon: "⭐",
    verses: [
      {
        reference: "Colossians 3:23",
        text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
      },
      {
        reference: "Proverbs 22:29",
        text: "Do you see someone skilled in their work? They will serve before kings.",
      },
      {
        reference: "Ecclesiastes 9:10",
        text: "Whatever your hand finds to do, do it with all your might.",
      },
      {
        reference: "1 Corinthians 10:31",
        text: "So whether you eat or drink or whatever you do, do it all for the glory of God.",
      },
      {
        reference: "Proverbs 16:3",
        text: "Commit to the Lord whatever you do, and he will establish your plans.",
      },
    ],
  },
  {
    id: 8,
    title: "HUMILITY",
    category: "Christian Living",
    icon: "🌱",
    verses: [
      {
        reference: "Proverbs 22:4",
        text: "Humility is the fear of the LORD; its wages are riches and honor and life.",
      },
      {
        reference: "James 4:10",
        text: "Humble yourselves before the Lord, and he will lift you up.",
      },
      {
        reference: "Philippians 2:3",
        text: "In humility value others above yourselves.",
      },
      {
        reference: "Luke 14:11",
        text: "For all those who exalt themselves will be humbled, and those who humble themselves will be exalted.",
      },
      {
        reference: "Matthew 5:5",
        text: "Blessed are the meek, for they will inherit the earth.",
      },
      {
        reference: "Mark 10:43-44",
        text: "Whoever wants to become great among you must be your servant, and whoever wants to be first must be slave of all.",
      },
    ],
  },
  {
    id: 9,
    title: "PURPOSE",
    category: "Stewardship",
    icon: "🎯",
    verses: [
      {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
      },
      {
        reference: "Romans 8:28",
        text: "In all things God works for the good of those who love him, who have been called according to his purpose.",
      },
      {
        reference: "Ephesians 2:10",
        text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",
      },
      {
        reference: "Psalm 33:11",
        text: "But the plans of the LORD stand firm forever, the purposes of his heart through all generations.",
      },
    ],
  },
  {
    id: 10,
    title: "MIRACLE",
    category: "God & Faith",
    icon: "🌟",
    verses: [
      {
        reference: "Mark 9:23",
        text: "Everything is possible for one who believes.",
      },
      {
        reference: "Matthew 19:26",
        text: "With man this is impossible, but with God all things are possible.",
      },
      {
        reference: "John 2:11",
        text: "What Jesus did here in Cana of Galilee was the first of the signs through which he revealed his glory.",
      },
      {
        reference: "Acts 3:16",
        text: "By faith in the name of Jesus, this man whom you see and know was made strong.",
      },
    ],
  },
  {
    id: 11,
    title: "THE LORD JESUS",
    category: "God & Faith",
    icon: "✝️",
    verses: [
      {
        reference: "John 14:6",
        text: "I am the way and the truth and the life. No one comes to the Father except through me.",
      },
      {
        reference: "Philippians 2:10-11",
        text: "At the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue acknowledge that Jesus Christ is Lord.",
      },
      {
        reference: "Matthew 28:18",
        text: "All authority in heaven and on earth has been given to me.",
      },
      {
        reference: "Colossians 3:17",
        text: "Whatever you do, whether in word or deed, do it all in the name of the Lord Jesus.",
      },
    ],
  },
  {
    id: 12,
    title: "OBEDIENCE",
    category: "Christian Living",
    icon: "🎧",
    verses: [
      {
        reference: "John 14:15",
        text: "If you love me, you will keep my commandments.",
      },
      {
        reference: "Isaiah 1:19",
        text: "If you are willing and obedient, you shall eat the good of the land.",
      },
      { reference: "Acts 5:29", text: "We must obey God rather than men." },
      {
        reference: "1 John 5:3",
        text: "For this is the love of God, that we keep his commandments. And his commandments are not burdensome.",
      },
    ],
  },
  {
    id: 13,
    title: "COURAGE",
    category: "Trials & Growth",
    icon: "🦁",
    verses: [
      {
        reference: "Joshua 1:9",
        text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
      },
      {
        reference: "Isaiah 41:10",
        text: "Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.",
      },
      {
        reference: "2 Timothy 1:7",
        text: "For God has not given us a spirit of fear, but of power, love, and a sound mind.",
      },
      {
        reference: "1 Corinthians 16:13",
        text: "Be on your guard; stand firm in the faith; be courageous; be strong.",
      },
    ],
  },
  {
    id: 14,
    title: "RESPONSIBILITY",
    category: "Stewardship",
    icon: "📋",
    verses: [
      {
        reference: "Galatians 6:5",
        text: "For each one should carry their own load.",
      },
      {
        reference: "Luke 16:10",
        text: "Whoever can be trusted with very little can also be trusted with much.",
      },
      {
        reference: "1 Corinthians 4:2",
        text: "Now it is required that those who have been given a trust must prove faithful.",
      },
      {
        reference: "Proverbs 12:24",
        text: "Diligent hands will rule, but laziness ends in forced labor.",
      },
    ],
  },
  {
    id: 15,
    title: "PEACE",
    category: "Life",
    icon: "🕊️",
    verses: [
      {
        reference: "John 16:33",
        text: "In me you may have peace. In the world you will have tribulation. But take heart; I have overcome the world.",
      },
      {
        reference: "Isaiah 26:3",
        text: "You keep him in perfect peace whose mind is stayed on you, because he trusts in you.",
      },
      {
        reference: "John 14:27",
        text: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled.",
      },
      {
        reference: "Philippians 4:7",
        text: "The peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
      },
    ],
  },
  {
    id: 16,
    title: "HOLY SPIRIT",
    category: "God & Faith",
    icon: "🕯️",
    verses: [
      {
        reference: "John 14:26",
        text: "The Helper, the Holy Spirit, whom the Father will send in my name, he will teach you all things.",
      },
      {
        reference: "Acts 1:8",
        text: "You will receive power when the Holy Spirit has come upon you, and you will be my witnesses to the end of the earth.",
      },
      {
        reference: "Romans 8:26",
        text: "The Spirit helps us in our weakness. The Spirit himself intercedes for us with groanings too deep for words.",
      },
      {
        reference: "John 16:12-15",
        text: "When the Spirit of truth comes, he will guide you into all the truth.",
      },
    ],
  },
  {
    id: 17,
    title: "GOD'S WORD",
    category: "Spiritual Disciplines",
    icon: "📖",
    verses: [
      {
        reference: "Hebrews 4:12",
        text: "The word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit.",
      },
      {
        reference: "Isaiah 40:8",
        text: "The grass withers and the flowers fall, but the word of our God endures forever.",
      },
      {
        reference: "Psalm 119:9",
        text: "How can a young person stay on the path of purity? By living according to your word.",
      },
      {
        reference: "John 8:31-32",
        text: "If you hold to my teaching, you are really my disciples. Then you will know the truth, and the truth will set you free.",
      },
    ],
  },
  {
    id: 18,
    title: "KINDNESS",
    category: "Relationships",
    icon: "🤝",
    verses: [
      {
        reference: "Ephesians 4:32",
        text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
      },
      {
        reference: "Colossians 3:12",
        text: "Put on compassionate hearts, kindness, humility, meekness, and patience.",
      },
      {
        reference: "Proverbs 11:17",
        text: "A man who is kind benefits himself, but a cruel man hurts himself.",
      },
      {
        reference: "Luke 6:35",
        text: "Love your enemies, and do good, and lend, expecting nothing in return.",
      },
    ],
  },
  {
    id: 19,
    title: "WISDOM",
    category: "Spiritual Disciplines",
    icon: "💡",
    verses: [
      {
        reference: "James 1:5",
        text: "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him.",
      },
      {
        reference: "Proverbs 1:7",
        text: "The fear of the Lord is the beginning of knowledge; fools despise wisdom and instruction.",
      },
      {
        reference: "Proverbs 2:6",
        text: "For the Lord gives wisdom; from his mouth come knowledge and understanding.",
      },
      {
        reference: "James 3:17",
        text: "The wisdom from above is first pure, then peaceable, gentle, open to reason, full of mercy and good fruits.",
      },
    ],
  },
  {
    id: 20,
    title: "GRATITUDE",
    category: "Life",
    icon: "🙌",
    verses: [
      {
        reference: "1 Thessalonians 5:18",
        text: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
      },
      {
        reference: "Psalm 100:4",
        text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
      },
      {
        reference: "Psalm 136:1",
        text: "Give thanks to the LORD, for he is good. His love endures forever.",
      },
      {
        reference: "Colossians 3:17",
        text: "Whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father.",
      },
    ],
  },
  {
    id: 21,
    title: "PRAISE",
    category: "Spiritual Disciplines",
    icon: "🎵",
    verses: [
      {
        reference: "Psalm 34:1",
        text: "I will extol the Lord at all times; his praise will always be on my lips.",
      },
      {
        reference: "Psalm 103:1",
        text: "Praise the Lord, my soul; all my inmost being, praise his holy name.",
      },
      {
        reference: "Hebrews 13:15",
        text: "Through him then let us continually offer up a sacrifice of praise to God.",
      },
      {
        reference: "Psalm 139:13-14",
        text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
      },
    ],
  },
  {
    id: 22,
    title: "JOY",
    category: "Life",
    icon: "😊",
    verses: [
      {
        reference: "Philippians 4:4",
        text: "Rejoice in the Lord always; again I will say, rejoice.",
      },
      {
        reference: "Nehemiah 8:10",
        text: "The joy of the Lord is your strength.",
      },
      {
        reference: "John 15:11",
        text: "I have told you this so that my joy may be in you and that your joy may be complete.",
      },
      {
        reference: "Psalm 16:11",
        text: "In your presence there is fullness of joy; at your right hand are pleasures forevermore.",
      },
    ],
  },
  {
    id: 23,
    title: "FAMILY",
    category: "Relationships",
    icon: "👨‍👩‍👧‍👦",
    verses: [
      {
        reference: "Proverbs 22:6",
        text: "Train up a child in the way he should go; even when he is old he will not depart from it.",
      },
      {
        reference: "Ephesians 5:25",
        text: "Husbands, love your wives, as Christ loved the church and gave himself up for her.",
      },
      {
        reference: "Exodus 20:12",
        text: "Honor your father and your mother, that your days may be long.",
      },
      {
        reference: "Psalm 133:1",
        text: "How good and pleasant it is when God's people live together in unity!",
      },
    ],
  },
  {
    id: 24,
    title: "ANXIETY & STRESS",
    category: "Trials & Growth",
    icon: "😌",
    verses: [
      {
        reference: "Philippians 4:6",
        text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
      },
      {
        reference: "1 Peter 5:6-7",
        text: "Humble yourselves under the mighty hand of God... casting all your anxieties on him, because he cares for you.",
      },
      {
        reference: "Matthew 11:28-30",
        text: "Come to me, all who labor and are heavy laden, and I will give you rest.",
      },
      {
        reference: "Psalm 55:22",
        text: "Cast your burden on the Lord, and he will sustain you; he will never permit the righteous to be moved.",
      },
    ],
  },
  {
    id: 25,
    title: "HOPE",
    category: "Life",
    icon: "✨",
    verses: [
      {
        reference: "Isaiah 40:31",
        text: "Those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary.",
      },
      {
        reference: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace as you trust in him.",
      },
      {
        reference: "Romans 8:24-25",
        text: "For in this hope we were saved. But if we hope for what we do not see, we wait for it with patience.",
      },
      {
        reference: "1 Corinthians 13:13",
        text: "And now these three remain: faith, hope and love. But the greatest of these is love.",
      },
    ],
  },
  {
    id: 26,
    title: "FEAR",
    category: "Trials & Growth",
    icon: "🛡️",
    verses: [
      {
        reference: "Isaiah 41:10",
        text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you.",
      },
      {
        reference: "2 Timothy 1:7",
        text: "For God gave us a spirit not of fear but of power and love and self-control.",
      },
      {
        reference: "1 John 4:18",
        text: "There is no fear in love, but perfect love casts out fear.",
      },
      {
        reference: "Psalm 34:4",
        text: "I sought the Lord, and he answered me and delivered me from all my fears.",
      },
    ],
  },
  {
    id: 27,
    title: "TEMPTATION",
    category: "Trials & Growth",
    icon: "⚔️",
    verses: [
      {
        reference: "1 Corinthians 10:13",
        text: "No temptation has overtaken you except what is common to mankind. God is faithful; he will not let you be tempted beyond what you can bear.",
      },
      {
        reference: "James 1:13-18",
        text: "When tempted, no one should say, God is tempting me. For God cannot be tempted by evil, nor does he tempt anyone.",
      },
      {
        reference: "Luke 22:40",
        text: "Pray that you will not fall into temptation.",
      },
    ],
  },
  {
    id: 28,
    title: "PRIDE",
    category: "Christian Living",
    icon: "🏔️",
    verses: [
      {
        reference: "Proverbs 11:2",
        text: "When pride comes, then comes disgrace, but with humility comes wisdom.",
      },
      {
        reference: "James 4:6",
        text: "God opposes the proud but shows favor to the humble.",
      },
      {
        reference: "Proverbs 29:23",
        text: "Pride brings a person low, but the lowly in spirit gain honor.",
      },
      {
        reference: "Philippians 2:3",
        text: "Do nothing out of selfish ambition or vain conceit. In humility value others above yourselves.",
      },
    ],
  },
  {
    id: 29,
    title: "DOUBT",
    category: "Trials & Growth",
    icon: "❓",
    verses: [
      {
        reference: "James 1:6",
        text: "But let him ask in faith, with no doubting, for the one who doubts is like a wave of the sea that is driven and tossed by the wind.",
      },
      {
        reference: "Matthew 21:21",
        text: "If you have faith and do not doubt, nothing will be impossible for you.",
      },
      {
        reference: "Luke 24:38",
        text: "Why are you troubled, and why do doubts arise in your hearts?",
      },
    ],
  },
  {
    id: 30,
    title: "LOSS",
    category: "Trials & Growth",
    icon: "💔",
    verses: [
      {
        reference: "Matthew 5:4",
        text: "Blessed are those who mourn, for they shall be comforted.",
      },
      {
        reference: "Psalm 34:18",
        text: "The Lord is near to the brokenhearted and saves the crushed in spirit.",
      },
      {
        reference: "Revelation 21:4",
        text: "He will wipe away every tear from their eyes, and death shall be no more.",
      },
      {
        reference: "John 16:22",
        text: "You have sorrow now, but I will see you again, and your hearts will rejoice, and no one will take your joy from you.",
      },
    ],
  },
  {
    id: 31,
    title: "ANGER",
    category: "Relationships",
    icon: "😤",
    verses: [
      {
        reference: "Ephesians 4:26",
        text: "Be angry and do not sin; do not let the sun go down on your anger.",
      },
      {
        reference: "James 1:19-20",
        text: "Let every person be quick to hear, slow to speak, slow to anger; for the anger of man does not produce the righteousness of God.",
      },
      {
        reference: "Proverbs 15:1",
        text: "A soft answer turns away wrath, but a harsh word stirs up anger.",
      },
      {
        reference: "Proverbs 14:29",
        text: "Whoever is slow to anger has great understanding, but he who has a hasty temper exalts folly.",
      },
    ],
  },
  {
    id: 32,
    title: "ETERNAL LIFE",
    category: "God & Faith",
    icon: "♾️",
    verses: [
      {
        reference: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      },
      {
        reference: "John 5:24",
        text: "Whoever hears my word and believes him who sent me has eternal life and will not be judged but has crossed over from death to life.",
      },
      {
        reference: "1 John 5:13",
        text: "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life.",
      },
    ],
  },
  {
    id: 33,
    title: "SALVATION",
    category: "God & Faith",
    icon: "🆓",
    verses: [
      {
        reference: "Acts 4:12",
        text: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.",
      },
      {
        reference: "John 14:6",
        text: "I am the way and the truth and the life. No one comes to the Father except through me.",
      },
      {
        reference: "Acts 16:31",
        text: "Believe in the Lord Jesus, and you will be saved — you and your household.",
      },
      {
        reference: "Titus 3:5",
        text: "He saved us, not because of righteous things we had done, but because of his mercy.",
      },
    ],
  },
  {
    id: 34,
    title: "FORGIVENESS",
    category: "Relationships",
    icon: "🤗",
    verses: [
      {
        reference: "Ephesians 4:32",
        text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
      },
      {
        reference: "1 John 1:9",
        text: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.",
      },
      {
        reference: "Matthew 18:21-22",
        text: "Lord, how often will my brother sin against me, and I forgive him? Jesus said: not seven times, but seventy-seven times.",
      },
      {
        reference: "Colossians 3:13",
        text: "Forgiving each other; as the Lord has forgiven you, so you also must forgive.",
      },
    ],
  },
  {
    id: 35,
    title: "MEDITATION",
    category: "Spiritual Disciplines",
    icon: "🧘",
    verses: [
      {
        reference: "Joshua 1:8",
        text: "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it.",
      },
      {
        reference: "Psalm 119:15",
        text: "I will meditate on your precepts and consider your ways.",
      },
      {
        reference: "Colossians 3:16",
        text: "Let the message of Christ dwell among you richly, as you teach and admonish one another with all wisdom.",
      },
    ],
  },
  {
    id: 36,
    title: "OFFERING",
    category: "Stewardship",
    icon: "🎁",
    verses: [
      {
        reference: "2 Corinthians 9:7",
        text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
      },
      {
        reference: "Acts 20:35",
        text: "It is more blessed to give than to receive.",
      },
      {
        reference: "Luke 21:1-4",
        text: "This poor widow has put more into the treasury than all the others.",
      },
    ],
  },
  {
    id: 37,
    title: "TITHE",
    category: "Stewardship",
    icon: "💰",
    verses: [
      {
        reference: "Malachi 3:8 & 10",
        text: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this, says the Lord Almighty, and see if I will not throw open the floodgates of heaven and pour out so much blessing.",
      },
      {
        reference: "Proverbs 3:9",
        text: "Honor the Lord with your wealth, with the first fruits of all your crops.",
      },
      {
        reference: "Leviticus 27:30",
        text: "A tithe of everything from the land belongs to the Lord; it is holy to the Lord.",
      },
    ],
  },
  {
    id: 38,
    title: "GIVING TO OTHERS",
    category: "Stewardship",
    icon: "🎁",
    verses: [
      {
        reference: "Luke 6:38",
        text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.",
      },
      {
        reference: "Proverbs 11:25",
        text: "A generous person will prosper; whoever refreshes others will be refreshed.",
      },
      {
        reference: "Matthew 25:40",
        text: "Whatever you did for one of the least of these brothers and sisters of mine, you did for me.",
      },
      {
        reference: "Isaiah 58:10",
        text: "If you spend yourselves in behalf of the hungry, then your light will rise in the darkness.",
      },
    ],
  },
  {
    id: 39,
    title: "ATTITUDE IN GIVING",
    category: "Stewardship",
    icon: "💝",
    verses: [
      {
        reference: "2 Corinthians 9:6",
        text: "Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously.",
      },
      {
        reference: "Matthew 6:2",
        text: "When you give to the needy, do not announce it with trumpets, as the hypocrites do.",
      },
      {
        reference: "Romans 12:8",
        text: "If it is giving, then give generously; if it is to show mercy, do it cheerfully.",
      },
    ],
  },
  {
    id: 40,
    title: "WORSHIP",
    category: "Spiritual Disciplines",
    icon: "🙌",
    verses: [
      {
        reference: "John 4:21-24",
        text: "God is spirit, and his worshipers must worship in the Spirit and in truth.",
      },
      {
        reference: "Romans 12:1-2",
        text: "Offer your bodies as a living sacrifice, holy and pleasing to God — this is your true and proper worship.",
      },
      {
        reference: "Psalm 100",
        text: "Shout for joy to the LORD, all the earth. Worship the LORD with gladness; come before him with joyful songs.",
      },
    ],
  },
  {
    id: 41,
    title: "BLESSING IN GIVING",
    category: "Stewardship",
    icon: "🌟",
    verses: [
      {
        reference: "Proverbs 22:9",
        text: "The generous will themselves be blessed, for they share their food with the poor.",
      },
      {
        reference: "Luke 12:33-34",
        text: "Provide purses for yourselves that will not wear out, a treasure in heaven that will never fail.",
      },
      {
        reference: "1 Timothy 6:18-19",
        text: "Command them to do good, to be rich in good deeds, and to be generous and willing to share.",
      },
    ],
  },
];

const categories = [
  "All",
  "God & Faith",
  "Christian Living",
  "Life",
  "Relationships",
  "Trials & Growth",
  "Stewardship",
  "Spiritual Disciplines",
];

export default function TopicalPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [learningForm, setLearningForm] = useState({
    name: "",
    email: "",
    learning: "",
  });
  const [learningState, setLearningState] = useState("idle");
  const [downloadForm, setDownloadForm] = useState({ name: "", email: "" });
  const [downloadState, setDownloadState] = useState("idle");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const drawerRef = useRef(null);

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    setDrawerOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeTopic = () => {
    setDrawerOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setSelectedTopic(null), 320);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeTopic();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filteredTopics = useMemo(() => {
    return topicsData.filter((t) => {
      const matchSearch = t.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCat =
        selectedCategory === "All" || t.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (verse, idx) => {
    navigator.clipboard.writeText(`${verse.reference} — ${verse.text}`);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  };

  const handleLearningSubmit = async () => {
    if (!learningForm.name || !learningForm.email || !learningForm.learning)
      return;
    setLearningState("loading");
    try {
      const res = await fetch(
        "https://lovetoons.org/php/learning-topical.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...learningForm,
            topic: selectedTopic?.title,
          }),
        }
      );
      setLearningState(res.ok ? "success" : "error");
      if (res.ok)
        setTimeout(() => {
          setLearningState("idle");
          setLearningForm({ name: "", email: "", learning: "" });
        }, 3000);
    } catch {
      setLearningState("error");
    }
  };

  const handleDownloadSubmit = async () => {
    if (!downloadForm.name || !downloadForm.email) return;
    setDownloadState("loading");
    try {
      const res = await fetch(
        "https://lovetoons.org/php/download-topical.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...downloadForm,
            topics: selectedTopic ? [selectedTopic.title] : [],
          }),
        }
      );
      setDownloadState(res.ok ? "success" : "error");
      if (res.ok)
        setTimeout(() => {
          setShowDownloadModal(false);
          setDownloadState("idle");
          setDownloadForm({ name: "", email: "" });
        }, 2200);
    } catch {
      setDownloadState("error");
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700;800&display=swap");

        :root {
          --sky: #e8f7ff;
          --cloud: #ffffff;
          --ink: #1e2a3a;
          --ink-soft: #3d5068;
          --ink-muted: #7a90a8;
          --rule: #c8e0f0;
          --sun: #ffb703;
          --sun-light: #fff3cc;
          --sun-bg: #fffbe8;
          --coral: #ff6b6b;
          --mint: #06d6a0;
          --lavender: #9b5de5;
          --peach: #ff9a5c;
          --white: #ffffff;
          --drawer-w: 560px;
          --card-radius: 20px;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: var(--sky);
          background-image: radial-gradient(
              circle at 15% 20%,
              rgba(255, 183, 3, 0.12) 0%,
              transparent 40%
            ),
            radial-gradient(
              circle at 85% 70%,
              rgba(155, 93, 229, 0.1) 0%,
              transparent 40%
            ),
            radial-gradient(
              circle at 50% 90%,
              rgba(6, 214, 160, 0.1) 0%,
              transparent 40%
            );
          font-family: "Nunito", sans-serif;
          color: var(--ink);
          min-height: 100vh;
        }

        /* floating stars decoration */
        body::before {
          content: "✦ ✧ ✦ ✧ ✦";
          position: fixed;
          top: 1.5rem;
          right: 2rem;
          font-size: 1rem;
          color: var(--sun);
          opacity: 0.5;
          pointer-events: none;
          letter-spacing: 0.4rem;
          animation: twinkle 3s ease-in-out infinite alternate;
        }
        @keyframes twinkle {
          from {
            opacity: 0.3;
            transform: scale(1);
          }
          to {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        /* ─── HERO ──────────────────────────────── */
        .tp-hero {
          padding: 4rem 2rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
          border-bottom: 3px dashed var(--rule);
          position: relative;
        }

        .tp-hero-label {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .tp-hero-label::before {
          content: "📖";
          font-size: 1.2rem;
          letter-spacing: 0;
        }
        .tp-hero-label::after {
          content: "🌟";
          font-size: 1.1rem;
          letter-spacing: 0;
          flex: none;
          width: auto;
          height: auto;
          background: none;
        }

        .tp-hero h1 {
          font-family: "Baloo 2", cursive;
          font-weight: 800;
          font-size: clamp(2.8rem, 6vw, 5rem);
          line-height: 1.05;
          color: var(--ink);
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }

        .tp-hero h1 em {
          font-style: normal;
          color: var(--lavender);
          -webkit-text-stroke: 1px var(--lavender);
        }

        .tp-hero-sub {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--ink-soft);
          line-height: 1.8;
          max-width: 480px;
        }

        .tp-hero-meta {
          display: flex;
          gap: 1.25rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .tp-hero-stat {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          background: var(--white);
          border-radius: 16px;
          padding: 0.85rem 1.4rem;
          box-shadow: 0 4px 0 rgba(0, 0, 0, 0.07);
          border: 2px solid var(--rule);
        }
        .tp-hero-stat:nth-child(1) {
          border-color: var(--sun);
        }
        .tp-hero-stat:nth-child(2) {
          border-color: var(--mint);
        }
        .tp-hero-stat:nth-child(3) {
          border-color: var(--lavender);
        }

        .tp-hero-stat-num {
          font-family: "Baloo 2", cursive;
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--ink);
          line-height: 1;
        }
        .tp-hero-stat-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        /* ─── CONTROLS ──────────────────────────── */
        .tp-controls {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.75rem 2rem 1.5rem;
          display: flex;
          gap: 0.85rem;
          align-items: center;
          flex-wrap: wrap;
          border-bottom: 3px dashed var(--rule);
        }

        .tp-search {
          flex: 1;
          min-width: 200px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 2.5px solid var(--rule);
          border-radius: 50px;
          padding: 0.65rem 1.2rem;
          background: var(--white);
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 3px 0 rgba(0, 0, 0, 0.06);
        }
        .tp-search:focus-within {
          border-color: var(--sun);
          box-shadow: 0 3px 0 rgba(255, 183, 3, 0.25);
        }
        .tp-search-icon {
          color: var(--ink-muted);
          font-size: 1rem;
          flex-shrink: 0;
        }
        .tp-search input {
          border: none;
          outline: none;
          font-family: "Nunito", sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--ink);
          background: transparent;
          width: 100%;
        }
        .tp-search input::placeholder {
          color: var(--ink-muted);
          font-weight: 500;
        }

        .tp-cats {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .tp-cat-btn {
          border: 2.5px solid var(--rule);
          border-radius: 50px;
          padding: 0.4rem 1rem;
          font-family: "Nunito", sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          background: var(--white);
          color: var(--ink-soft);
          transition: all 0.18s;
          white-space: nowrap;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
        }
        .tp-cat-btn:hover {
          border-color: var(--sun);
          color: var(--ink);
          transform: translateY(-1px);
          box-shadow: 0 4px 0 rgba(0, 0, 0, 0.08);
        }
        .tp-cat-btn.active {
          background: var(--sun);
          border-color: var(--sun);
          color: var(--ink);
          box-shadow: 0 3px 0 rgba(200, 140, 0, 0.35);
        }

        .tp-random-btn {
          border: 2.5px solid var(--coral);
          border-radius: 50px;
          padding: 0.4rem 1rem;
          font-family: "Nunito", sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          background: var(--white);
          color: var(--coral);
          transition: all 0.18s;
          white-space: nowrap;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
        }
        .tp-random-btn:hover {
          background: var(--coral);
          color: white;
          transform: translateY(-1px) rotate(-2deg);
          box-shadow: 0 4px 0 rgba(200, 80, 80, 0.3);
        }

        /* ─── INDEX GRID ────────────────────────── */
        .tp-index-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.25rem 2rem 0.5rem;
          display: grid;
          grid-template-columns: 2.5rem 1fr auto auto;
          gap: 1rem;
          align-items: center;
        }

        .tp-index-col-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        .tp-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.5rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .tp-row {
          display: grid;
          grid-template-columns: 2.5rem 1fr auto auto;
          gap: 1rem;
          align-items: center;
          padding: 1rem 1.1rem;
          background: var(--white);
          border: 2.5px solid var(--rule);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: var(--card-radius);
          box-shadow: 0 3px 0 rgba(0, 0, 0, 0.07);
        }
        .tp-row:hover {
          border-color: var(--sun);
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 7px 0 rgba(255, 183, 3, 0.25);
        }
        .tp-row:hover .tp-row-title {
          color: var(--lavender);
        }
        .tp-row:nth-child(5n + 1):hover {
          border-color: var(--sun);
          box-shadow: 0 7px 0 rgba(255, 183, 3, 0.25);
        }
        .tp-row:nth-child(5n + 2):hover {
          border-color: var(--coral);
          box-shadow: 0 7px 0 rgba(255, 107, 107, 0.25);
        }
        .tp-row:nth-child(5n + 3):hover {
          border-color: var(--mint);
          box-shadow: 0 7px 0 rgba(6, 214, 160, 0.25);
        }
        .tp-row:nth-child(5n + 4):hover {
          border-color: var(--lavender);
          box-shadow: 0 7px 0 rgba(155, 93, 229, 0.25);
        }
        .tp-row:nth-child(5n + 5):hover {
          border-color: var(--peach);
          box-shadow: 0 7px 0 rgba(255, 154, 92, 0.25);
        }

        .tp-row-icon {
          font-size: 1.5rem;
          line-height: 1;
          text-align: center;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
        }

        .tp-row-main {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .tp-row-title {
          font-family: "Baloo 2", cursive;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--ink);
          letter-spacing: 0;
          transition: color 0.15s;
        }

        .tp-row-cat {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        .tp-row-count {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--ink-muted);
          white-space: nowrap;
          text-align: right;
          background: var(--sky);
          padding: 0.2rem 0.6rem;
          border-radius: 50px;
          border: 1.5px solid var(--rule);
        }

        .tp-row-arrow {
          color: var(--ink-muted);
          font-size: 1rem;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            color 0.18s;
        }
        .tp-row:hover .tp-row-arrow {
          transform: translateX(4px) scale(1.2);
          color: var(--sun);
        }

        /* ─── EMPTY ─────────────────────────────── */
        .tp-empty {
          padding: 5rem 2rem;
          text-align: center;
          color: var(--ink-muted);
        }
        .tp-empty-title {
          font-family: "Baloo 2", cursive;
          font-size: 1.7rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--ink-soft);
        }
        .tp-empty::before {
          content: "🔍";
          display: block;
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        /* ─── RESULTS COUNT ─────────────────────── */
        .tp-results-bar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem 0.25rem;
          font-size: 0.82rem;
          color: var(--ink-muted);
          font-weight: 700;
        }

        /* ─── DRAWER ────────────────────────────── */
        .tp-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(30, 42, 58, 0.45);
          z-index: 900;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .tp-drawer-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .tp-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: var(--drawer-w);
          max-width: 100vw;
          background: var(--sky);
          z-index: 901;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
          border-left: 3px solid var(--rule);
        }
        .tp-drawer.open {
          transform: translateX(0);
        }

        .tp-drawer-head {
          padding: 1.75rem 2rem 1.25rem;
          border-bottom: 3px dashed var(--rule);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-shrink: 0;
          background: var(--white);
        }

        .tp-drawer-head-left {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .tp-drawer-cat-tag {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--coral);
          background: #fff0f0;
          display: inline-block;
          padding: 0.15rem 0.6rem;
          border-radius: 50px;
          border: 1.5px solid #ffd0d0;
        }

        .tp-drawer-title {
          font-family: "Baloo 2", cursive;
          font-size: 2rem;
          font-weight: 800;
          color: var(--ink);
          line-height: 1.1;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .tp-drawer-close {
          background: var(--coral);
          border: none;
          border-radius: 50px;
          padding: 0.45rem 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          color: white;
          font-family: "Nunito", sans-serif;
          transition: all 0.18s;
          flex-shrink: 0;
          box-shadow: 0 3px 0 rgba(200, 60, 60, 0.3);
        }
        .tp-drawer-close:hover {
          background: #e85555;
          transform: translateY(-1px);
          box-shadow: 0 5px 0 rgba(200, 60, 60, 0.3);
        }

        .tp-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tp-verse-block {
          padding: 1.25rem 1.4rem;
          background: var(--white);
          border-radius: 16px;
          border: 2px solid var(--rule);
          box-shadow: 0 3px 0 rgba(0, 0, 0, 0.06);
        }
        .tp-verse-block:nth-child(4n + 1) {
          border-left: 5px solid var(--sun);
        }
        .tp-verse-block:nth-child(4n + 2) {
          border-left: 5px solid var(--coral);
        }
        .tp-verse-block:nth-child(4n + 3) {
          border-left: 5px solid var(--mint);
        }
        .tp-verse-block:nth-child(4n + 4) {
          border-left: 5px solid var(--lavender);
        }

        .tp-verse-ref {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--lavender);
          margin-bottom: 0.6rem;
        }

        .tp-verse-text {
          font-family: "Nunito", sans-serif;
          font-size: 1rem;
          font-weight: 600;
          font-style: italic;
          line-height: 1.75;
          color: var(--ink);
          margin-bottom: 0.85rem;
        }

        .tp-verse-btns {
          display: flex;
          gap: 0.5rem;
        }
        .tp-verse-btn {
          border: 2px solid var(--rule);
          border-radius: 50px;
          padding: 0.28rem 0.9rem;
          font-size: 0.72rem;
          font-weight: 700;
          font-family: "Nunito", sans-serif;
          cursor: pointer;
          background: var(--sky);
          color: var(--ink-soft);
          transition: all 0.15s;
        }
        .tp-verse-btn:hover {
          border-color: var(--mint);
          color: var(--ink);
          background: #e8fff8;
          transform: scale(1.05);
        }
        .tp-verse-btn.copied {
          border-color: var(--mint);
          color: var(--mint);
          background: #e8fff8;
        }

        .tp-drawer-foot {
          padding: 1.25rem 1.5rem;
          border-top: 3px dashed var(--rule);
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
          background: var(--white);
        }

        .tp-foot-btn-primary {
          flex: 1;
          padding: 0.8rem;
          border-radius: 50px;
          border: none;
          background: var(--lavender);
          color: white;
          font-family: "Nunito", sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.18s;
          box-shadow: 0 4px 0 rgba(120, 60, 200, 0.3);
        }
        .tp-foot-btn-primary:hover {
          background: #8a4dd0;
          transform: translateY(-2px);
          box-shadow: 0 6px 0 rgba(120, 60, 200, 0.3);
        }

        .tp-foot-btn-ghost {
          flex: 1;
          padding: 0.8rem;
          border-radius: 50px;
          border: 2.5px solid var(--rule);
          background: transparent;
          color: var(--ink-soft);
          font-family: "Nunito", sans-serif;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.18s;
        }
        .tp-foot-btn-ghost:hover {
          border-color: var(--mint);
          color: var(--mint);
          background: #e8fff8;
        }

        /* ─── LEARNING SECTION ──────────────────── */
        .tp-learn-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          border-top: 3px dashed var(--rule);
        }

        .tp-learn-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .tp-learn-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .tp-learn-intro-label {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .tp-learn-intro-label::before {
          content: "✍️";
        }
        .tp-learn-intro-label::after {
          content: none;
        }

        .tp-learn-intro h2 {
          font-family: "Baloo 2", cursive;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          line-height: 1.15;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .tp-learn-intro h2 em {
          font-style: normal;
          color: var(--lavender);
        }

        .tp-learn-intro p {
          font-size: 0.98rem;
          font-weight: 600;
          line-height: 1.8;
          color: var(--ink-soft);
        }

        .tp-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          background: var(--white);
          padding: 2rem;
          border-radius: var(--card-radius);
          border: 2.5px solid var(--rule);
          box-shadow: 0 5px 0 rgba(0, 0, 0, 0.07);
        }

        .tp-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .tp-field label {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }

        .tp-field input,
        .tp-field textarea {
          border: 2.5px solid var(--rule);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-family: "Nunito", sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--ink);
          background: var(--sky);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: vertical;
        }
        .tp-field input:focus,
        .tp-field textarea:focus {
          border-color: var(--sun);
          box-shadow: 0 0 0 3px rgba(255, 183, 3, 0.15);
        }
        .tp-field textarea {
          min-height: 110px;
        }

        .tp-submit {
          border: none;
          border-radius: 50px;
          padding: 0.9rem;
          background: linear-gradient(135deg, var(--sun), var(--peach));
          color: var(--ink);
          font-family: "Nunito", sans-serif;
          font-size: 0.92rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 0 rgba(200, 140, 0, 0.3);
          transition: all 0.18s;
          font-family: "Figtree", sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: background 0.18s;
        }
        .tp-submit:hover:not(:disabled) {
          background: #2e2a27;
        }
        .tp-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .tp-form-status {
          font-size: 0.82rem;
          padding: 0.7rem 1rem;
          border-radius: 5px;
          text-align: center;
        }
        .tp-form-status.success {
          background: #f0fdf4;
          color: #166534;
        }
        .tp-form-status.error {
          background: #fef2f2;
          color: #991b1b;
        }

        /* ─── DOWNLOAD MODAL ────────────────────── */
        .tp-dl-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 23, 20, 0.55);
          z-index: 950;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .tp-dl-modal {
          background: var(--white);
          border-radius: 8px;
          max-width: 460px;
          width: 100%;
          padding: 2rem;
          animation: scaleIn 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .tp-dl-modal-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .tp-dl-modal-title {
          font-family: "Playfair Display", serif;
          font-size: 1.4rem;
          color: var(--ink);
        }

        .tp-dl-close {
          background: none;
          border: 1px solid var(--rule);
          border-radius: 4px;
          padding: 0.3rem 0.6rem;
          font-size: 0.8rem;
          cursor: pointer;
          color: var(--ink-soft);
        }
        .tp-dl-close:hover {
          border-color: var(--ink);
        }

        .tp-dl-desc {
          font-size: 0.88rem;
          font-weight: 300;
          color: var(--ink-soft);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(247, 244, 239, 0.4);
          border-top-color: var(--parchment);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 0.4rem;
          vertical-align: middle;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 700px) {
          :root {
            --drawer-w: 100vw;
          }
          .tp-hero {
            padding: 3rem 1.25rem 2.5rem;
          }
          .tp-controls {
            padding: 1.5rem 1.25rem 1rem;
          }
          .tp-grid {
            padding: 0 1.25rem 2rem;
          }
          .tp-index-header {
            padding: 1rem 1.25rem 0.25rem;
          }
          .tp-results-bar {
            padding: 0.75rem 1.25rem 0.25rem;
          }
          .tp-drawer-body {
            padding: 1.25rem;
          }
          .tp-drawer-head {
            padding: 1.25rem 1.25rem 1rem;
          }
          .tp-drawer-foot {
            padding: 1rem 1.25rem;
          }
          .tp-learn-section {
            padding: 3rem 1.25rem;
          }
          .tp-index-col-label:not(:nth-child(2)) {
            display: none;
          }
          .tp-row {
            grid-template-columns: 2rem 1fr auto;
          }
          .tp-row-count {
            display: none;
          }
        }
      `}</style>

      <div>
        {/* ─── HERO ─── */}
        <header className="tp-hero">
          <p className="tp-hero-label">Let`s Read the Bible</p>
          <h1>
            Topical
            <br />
            <em>Verse Guide</em>
          </h1>
          <p className="tp-hero-sub">
            Explore God`s Word by subject. Find scriptures for any season of
            life.
          </p>
          <div className="tp-hero-meta">
            <div className="tp-hero-stat">
              <span className="tp-hero-stat-num">{topicsData.length}</span>
              <span className="tp-hero-stat-label">Topics</span>
            </div>
            <div className="tp-hero-stat">
              <span className="tp-hero-stat-num">
                {topicsData.reduce((s, t) => s + t.verses.length, 0)}
              </span>
              <span className="tp-hero-stat-label">Verses</span>
            </div>
            <div className="tp-hero-stat">
              <span className="tp-hero-stat-num">{categories.length - 1}</span>
              <span className="tp-hero-stat-label">Categories</span>
            </div>
          </div>
        </header>

        {/* ─── CONTROLS ─── */}
        <div className="tp-controls">
          <div className="tp-search">
            <span className="tp-search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search topics…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="tp-cats">
            {categories.map((c) => (
              <button
                key={c}
                className={`tp-cat-btn${
                  selectedCategory === c ? " active" : ""
                }`}
                onClick={() => setSelectedCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            className="tp-random-btn"
            onClick={() =>
              openTopic(
                topicsData[Math.floor(Math.random() * topicsData.length)]
              )
            }
          >
            ↺ Random
          </button>
        </div>

        {/* ─── RESULTS BAR ─── */}
        <div className="tp-results-bar">
          {filteredTopics.length} of {topicsData.length} topics
        </div>

        {/* ─── INDEX HEADER ─── */}
        <div className="tp-index-header">
          <span className="tp-index-col-label"></span>
          <span className="tp-index-col-label">Topic</span>
          <span className="tp-index-col-label">Verses</span>
          <span className="tp-index-col-label"></span>
        </div>

        {/* ─── TOPIC INDEX ─── */}
        <div className="tp-grid">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="tp-row"
                onClick={() => openTopic(topic)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openTopic(topic)}
              >
                <span className="tp-row-icon">{topic.icon}</span>
                <div className="tp-row-main">
                  <span className="tp-row-title">{topic.title}</span>
                  <span className="tp-row-cat">{topic.category}</span>
                </div>
                <span className="tp-row-count">
                  {topic.verses.length} verse
                  {topic.verses.length !== 1 ? "s" : ""}
                </span>
                <span className="tp-row-arrow">→</span>
              </div>
            ))
          ) : (
            <div className="tp-empty">
              <p className="tp-empty-title">No results found</p>
              <p style={{ fontSize: ".88rem" }}>
                Try a different search term or category
              </p>
            </div>
          )}
        </div>

        {/* ─── LEARNING SECTION ─── */}
        <section className="tp-learn-section">
          <div className="tp-learn-grid">
            <div className="tp-learn-intro">
              <p className="tp-learn-intro-label">Reflect & Share</p>
              <h2>
                What is God
                <br />
                <em>teaching you?</em>
              </h2>
              <p>
                Has a topic spoken to your heart? Share your reflection — how
                His Word is working in your life, shaping your faith, or meeting
                you in your season.
              </p>
            </div>
            <div className="tp-form">
              <div className="tp-field">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={learningForm.name}
                  onChange={(e) =>
                    setLearningForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="tp-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={learningForm.email}
                  onChange={(e) =>
                    setLearningForm((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
              <div className="tp-field">
                <label>Your Reflection</label>
                <textarea
                  placeholder="Share what God is teaching you through His Word…"
                  value={learningForm.learning}
                  onChange={(e) =>
                    setLearningForm((p) => ({ ...p, learning: e.target.value }))
                  }
                />
              </div>
              <button
                className="tp-submit"
                onClick={handleLearningSubmit}
                disabled={
                  learningState === "loading" ||
                  !learningForm.name ||
                  !learningForm.email ||
                  !learningForm.learning
                }
              >
                {learningState === "loading" ? (
                  <>
                    <span className="spinner" />
                    Sharing…
                  </>
                ) : learningState === "success" ? (
                  "Shared — Thank you."
                ) : (
                  "Share My Reflection"
                )}
              </button>
              {learningState === "success" && (
                <div className="tp-form-status success">
                  Your reflection has been received. Thank you.
                </div>
              )}
              {learningState === "error" && (
                <div className="tp-form-status error">
                  Something went wrong. Please try again.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ─── DRAWER OVERLAY ─── */}
      <div
        className={`tp-drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={closeTopic}
      />

      {/* ─── DRAWER ─── */}
      <aside
        className={`tp-drawer${drawerOpen ? " open" : ""}`}
        ref={drawerRef}
        aria-modal="true"
        role="dialog"
      >
        {selectedTopic && (
          <>
            <div className="tp-drawer-head">
              <div className="tp-drawer-head-left">
                <span className="tp-drawer-cat-tag">
                  {selectedTopic.category}
                </span>
                <h2 className="tp-drawer-title">
                  <span>{selectedTopic.icon}</span>
                  {selectedTopic.title}
                </h2>
              </div>
              <button className="tp-drawer-close" onClick={closeTopic}>
                ✕ Close
              </button>
            </div>

            <div className="tp-drawer-body">
              {selectedTopic.verses.map((verse, idx) => (
                <div key={idx} className="tp-verse-block">
                  <div className="tp-verse-ref">{verse.reference}</div>
                  <p className="tp-verse-text">{verse.text}</p>
                  <div className="tp-verse-btns">
                    <button
                      className={`tp-verse-btn${
                        copiedIdx === idx ? " copied" : ""
                      }`}
                      onClick={() => handleCopy(verse, idx)}
                    >
                      {copiedIdx === idx ? "Copied" : "Copy verse"}
                    </button>
                    {typeof navigator !== "undefined" && navigator.share && (
                      <button
                        className="tp-verse-btn"
                        onClick={() =>
                          navigator.share({
                            title: `${selectedTopic.title}: ${verse.reference}`,
                            text: verse.text,
                          })
                        }
                      >
                        Share
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="tp-drawer-foot">
              <button
                className="tp-foot-btn-primary"
                onClick={() => setShowDownloadModal(true)}
              >
                Download all verses
              </button>
              <button
                className="tp-foot-btn-ghost"
                onClick={() => {
                  const text = selectedTopic.verses
                    .map((v) => `${v.reference}\n${v.text}`)
                    .join("\n\n");
                  if (navigator.share)
                    navigator.share({
                      title: `${selectedTopic.title} — Bible Verses`,
                      text,
                    });
                }}
              >
                Share topic
              </button>
            </div>
          </>
        )}
      </aside>

      {/* ─── DOWNLOAD MODAL ─── */}
      {showDownloadModal && (
        <div
          className="tp-dl-overlay"
          onClick={() => setShowDownloadModal(false)}
        >
          <div className="tp-dl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tp-dl-modal-head">
              <h3 className="tp-dl-modal-title">
                Download {selectedTopic?.title} Verses
              </h3>
              <button
                className="tp-dl-close"
                onClick={() => setShowDownloadModal(false)}
              >
                ✕
              </button>
            </div>
            <p className="tp-dl-desc">
              Enter your details and we`ll send all{" "}
              <strong>{selectedTopic?.title}</strong> verses to your inbox.
            </p>
            <div className="tp-form">
              <div className="tp-field">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={downloadForm.name}
                  onChange={(e) =>
                    setDownloadForm((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="tp-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={downloadForm.email}
                  onChange={(e) =>
                    setDownloadForm((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
              <button
                className="tp-submit"
                onClick={handleDownloadSubmit}
                disabled={
                  downloadState === "loading" ||
                  !downloadForm.name ||
                  !downloadForm.email
                }
              >
                {downloadState === "loading" ? (
                  <>
                    <span className="spinner" />
                    Preparing…
                  </>
                ) : downloadState === "success" ? (
                  "✓ Sent — check your inbox"
                ) : (
                  "Send me these verses"
                )}
              </button>
              {downloadState === "error" && (
                <div className="tp-form-status error">
                  Something went wrong. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
