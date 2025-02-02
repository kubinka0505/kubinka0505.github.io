class meta {
	static cyrlic_silent = ["🇷🇺 Replace latin letters to their cyrlic equivalents silently"]
	static cyrlic = ["🇷🇺 Replace latin letters to their cyrlic look-alikes (subjective 🔥)"]
	static poko = ["🇵🇱 Upper the occurences of PO, KO and PIS"]
}

class phrases {
	static poko = ["PO", "KO", "PIS"];
}

const presets = {
	Cyrlic_Silent: {
		"a": "а",
		"A": "А",
		"B": "В",
		"c": "с",
		"C": "С",
		"e": "е",
		"E": "Е",
		"H": "Н",
		"i": "і",
		"I": "І",
		"j": "ј",
		"J": "Ј",
		"M": "М",
		"o": "о",
		"O": "О",
		"p": "р",
		"P": "Р",
		"s": "ѕ",
		"S": "Ѕ",
		"T": "Т",
		"x": "х",
		"X": "Х",
		"y": "у"
	},

	Cyrlic: {
		"3": "З",
		"4": "Ч",
		"a": "а",
		"A": "А",
		"B": "В",
		"c": "с",
		"C": "С",
		"e": "е",
		"E": "Е",
		"H": "Н",
		"i": "і",
		"I": "І",
		"j": "ј",
		"J": "Ј",
		"K": "К",
		"M": "М",
		"N": "И",
		"o": "о",
		"O": "О",
		"p": "р",
		"P": "Р",
		"R": "Я",
		"r": "г",
		"s": "ѕ",
		"S": "Ѕ",
		"T": "Т",
		"U": "Ц",
		"u": "ц",
		"V": "Ѵ",
		"v": "ѵ",
		"W": "Ш",
		"x": "х",
		"X": "Х",
		"y": "у"
	},

	POKO: {
		"po": phrases.poko[0], "Po": phrases.poko[0], "pO": phrases.poko[0],
		"ko": phrases.poko[1], "Ko": phrases.poko[1], "kO": phrases.poko[1],

		"pis": phrases.poko[2], "Pis": phrases.poko[2], "PIs": phrases.poko[2],
		"pIS": phrases.poko[2], "piS": phrases.poko[2], "pIs": phrases.poko[2]
	}
};