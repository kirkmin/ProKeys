_.extend(Backbone.View.prototype, {


	defaultKeys: {
		"q" : "D2",
		"w" : "E2",
		"e" : "Gb2",
		"r" : "A2",
		"t" : "E5",
		"y" : "Gb5",
		"u" : "Ab5",
		"i" : "A5",
		"o" : "B5",
		"p" : "Db6",
		"[" : "D6",
		"]" : "E6",
		"a" : "A2",
		"s" : "B2",
		"d" : "Db3",
		"f" : "E3",
		"g" : "A4",
		"h" : "B4",
		"j" : "Db5",
		"k" : "D5",
		"l" : "E5",
		";" : "Ab5",
		"'" : "A5",
		"z" : "Gb3",
		"x" : "Ab3",
		"c" : "A3",
		"v" : "Db4",
		"b" : "Ab4",
		"n" : "A4",
		"m" : "A4",
		"," : "A4",
		"." : "A4",
		"/" : "A4"
	},

	keyCodes: {
		"q" : 81,
		"w" : 87,
		"e" : 69,
		"r" : 82,
		"t" : 84,
		"y" : 89,
		"u" : 85,
		"i" : 73,
		"o" : 79,
		"p" : 80,
		"[" : 219,
		"]" : 221,
		"a" : 65,
		"s" : 83,
		"d" : 68,
		"f" : 70,
		"g" : 71,
		"h" : 72,
		"j" : 74,
		"k" : 75,
		"l" : 76,
		";" : 186,
		"'" : 222,
		"z" : 90,
		"x" : 88,
		"c" : 67,
		"v" : 86,
		"b" : 66,
		"n" : 78,
		"m" : 77,
		"," : 188,
		"." : 190,
		"/" : 191
	},

	keyFlags: {
		81 : false,
		87 : false,
		69 : false,
		82 : false,
		84 : false,
		89 : false,
		85 : false,
		73 : false,
		79 : false,
		80 : false,
		219 : false,
		221 : false,
		65 : false,
		83 : false,
		68 : false,
		70 : false,
		71 : false,
		72 : false,
		74 : false,
		75 : false,
		76 : false,
		186 : false,
		222 : false,
		90 : false,
		88 : false,
		67 : false,
		86 : false,
		66 : false,
		78 : false,
		77 : false,
		188 : false,
		190 : false,
		191 : false
	},

	// sounds: {
// A1
// A2
// A3
// A4
// A5
// A6
// A7
// Ab1
// Ab2
// Ab3
// Ab4
// Ab5
// Ab6
// Ab7
// B0
// B1
// B2
// B3
// B4
// B5
// B6
// B7
// Bb1
// Bb2
// Bb3
// Bb4
// Bb5
// Bb6
// Bb7
// C1
// C2
// C3
// C4
// C5
// C6
// C7
// D1
// D2
// D3
// D4
// D5
// D6
// D7
// Db1
// Db2
// Db3
// Db4
// Db5
// Db6
// Db7
// E1
// E2
// E3
// E4
// E5
// E6
// E7
// Eb1
// Eb2
// Eb3
// Eb4
// Eb5
// Eb6
// Eb7
// F1
// F2
// F3
// F4
// F5
// F6
// F7
// G1
// G2
// G3
// G4
// G5
// G6
// G7
// Gb1
// Gb2
// Gb3
// Gb4
// Gb5
// Gb6
// Gb7
	// },
})