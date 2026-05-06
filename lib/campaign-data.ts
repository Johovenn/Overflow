export type StereotypeId =
	| "pulse-energy"
	| "harmony-fan"
	| "deep-listeners"
	| "fuel-squad"
	| "sloth-supremacy"
	| "shutterbug"
	| "pathfinders"
	| "high-maintenance-peeps"
	| "ambis-arc"
	| "human-wifi";

export type Stereotype = {
	id: StereotypeId;
	name: string;
	icon: string;
	shortDescription: string;
	longDescription: string;
	compatibleWith: StereotypeId[];
};

export type CampaignAnswer = {
	label: string;
	text: string;
	stereotypeId: StereotypeId;
};

export type CampaignQuestion = {
	id: number;
	question: string;
	answers: CampaignAnswer[];
};

export const stereotypes: Record<StereotypeId, Stereotype> = {
	"pulse-energy": {
		id: "pulse-energy",
		name: "Pulse Energy",
		icon: "Zap",
		shortDescription: "Kamu literally baterai camp yang gak pernah lowbat!",
		longDescription:
			"Selalu gerak, gaspol olahraga, games, sampai aktivitas gila yang bikin adrenalin naik. Kamu adalah penyemangat utama yang bikin suasana langsung rame.",
		compatibleWith: ["ambis-arc", "human-wifi", "harmony-fan"],
	},
	"harmony-fan": {
		id: "harmony-fan",
		name: "Harmony Fan",
		icon: "Music",
		shortDescription: "PPW itu belahan jiwa kamu banget.",
		longDescription:
			"Kamu paling menyala saat PPW. Suara dan semangatmu sering membawa orang lain ingin merasakan hadirat Tuhan dengan lebih dalam juga.",
		compatibleWith: ["deep-listeners", "shutterbug", "pulse-energy"],
	},
	"deep-listeners": {
		id: "deep-listeners",
		name: "Deep Listeners",
		icon: "BookOpen",
		shortDescription: "Kamu si good listener saat sesi!",
		longDescription:
			"Tenang, fokus, dan mencatat hal penting dan baru menurut kamu saat sesi. Setiap pulang dari camp, kamu selalu bawa pulang hati dan pikiran yang penuh insight.",
		compatibleWith: ["harmony-fan", "ambis-arc", "sloth-supremacy"],
	},
	"fuel-squad": {
		id: "fuel-squad",
		name: "Fuel Squad",
		icon: "Utensils",
		shortDescription: "Makanan tuh love language kamu.",
		longDescription:
			"Suka banget makan bareng, hunting camilan, atau koleksi camilan untuk dibawa ke camp. Kamu bikin suasana kelompok jadi hangat dan enak banget dengan cara berbagi camilan yang kamu punya.",
		compatibleWith: ["sloth-supremacy", "human-wifi", "pulse-energy"],
	},
	"sloth-supremacy": {
		id: "sloth-supremacy",
		name: "Sloth Supremacy",
		icon: "Bed",
		shortDescription: "Bobo adalah prioritas utama!",
		longDescription:
			"Doyan tidur, gampang ngantuk, dan sering datang paling telat. Tapi setelah recovery, kamu balik bangun dengan energi fresh dan kualitas tinggi.",
		compatibleWith: ["fuel-squad", "shutterbug", "harmony-fan"],
	},
	"shutterbug": {
		id: "shutterbug",
		name: "Shutterbug",
		icon: "Camera",
		shortDescription: "Everywhere, anywhere harus ada dokumentasinya.",
		longDescription:
			"Suka foto-foto, bikin konten, atau photobooth. Kamulah pembuat semua kenangan di camp jadi aesthetic dan unforgettable.",
		compatibleWith: ["human-wifi", "pulse-energy", "high-maintenance-peeps"],
	},
	"pathfinders": {
		id: "pathfinders",
		name: "Pathfinders",
		icon: "Compass",
		shortDescription: "Pemimpin natural dengan rizz karisma tinggi.",
		longDescription:
			"Berani ambil inisiatif, jago memimpin, dan gampang menggerakkan orang lain. Kamulah tempat sandaran teman-temanmu saat mereka butuh pemimpin.",
		compatibleWith: ["ambis-arc", "deep-listeners", "pulse-energy"],
	},
	"high-maintenance-peeps": {
		id: "high-maintenance-peeps",
		name: "High Maintenance Peeps",
		icon: "Sparkles",
		shortDescription: "Kamu yang paling glow, fresh, dan tetap slay di camp.",
		longDescription:
			"Selalu rapi, stylish, wangi, dan terawat. Penampilan kamu top tier sebagai bentuk respect ke Tuhan dan orang sekitar.",
		compatibleWith: ["shutterbug", "human-wifi", "harmony-fan"],
	},
	"ambis-arc": {
		id: "ambis-arc",
		name: "Ambis Arc",
		icon: "Trophy",
		shortDescription: "Gak menang gak mantep.",
		longDescription:
			"Bangun pagi, on time, fokusnya gila, dan penuh ambisi rohani. Kamu literally teladan konsistensi dan kesungguhan di camp. Sumber kebahagiaanmu adalah saat kelompokmu bisa menang.",
		compatibleWith: ["pathfinders", "deep-listeners", "pulse-energy"],
	},
	"human-wifi": {
		id: "human-wifi",
		name: "Human Wi-Fi",
		icon: "Wifi",
		shortDescription: "Naluriah pengoleksi teman baru.",
		longDescription:
			"Super ramah, extrovert abis, dan jago banget cari teman baru. Kamu yang bikin suasana hidup, akrab, dan semua orang merasa welcome.",
		compatibleWith: ["shutterbug", "pulse-energy", "fuel-squad"],
	},
};

export const questions: CampaignQuestion[] = [
	{
		id: 1,
		question: "Bangun tidur, kamu langsung ngapain?",
		answers: [
			{ label: "A", text: "Olahraga atau main game bareng temen", stereotypeId: "pulse-energy" },
			{ label: "B", text: "Nyalain playlist lagu sambil bersantai", stereotypeId: "harmony-fan" },
			{ label: "C", text: "Duduk tenang dengerin firman atau podcast rohani", stereotypeId: "deep-listeners" },
			{ label: "D", text: "Cari makanan dulu, perut kenyang baru semangat", stereotypeId: "fuel-squad" },
			{ label: "E", text: "Lanjut tidur 5 menit lagi", stereotypeId: "sloth-supremacy" },
		],
	},
	{
		id: 2,
		question: "Kalau ada waktu luang 1 jam di camp, apa yang kamu lakukan?",
		answers: [
			{ label: "A", text: "Foto-foto dan bikin video TikTok bareng temen", stereotypeId: "shutterbug" },
			{ label: "B", text: "Mandi atau self-care", stereotypeId: "high-maintenance-peeps" },
			{ label: "C", text: "Kenalan dan cari temen baru", stereotypeId: "human-wifi" },
			{ label: "D", text: "Berkonspirasi untuk memecahkan teka-teki dari storyline", stereotypeId: "ambis-arc" },
			{ label: "E", text: "Menyusun strategi biar tim atau kelompok bisa menang", stereotypeId: "pathfinders" },
		],
	},
	{
		id: 3,
		question: "Kalau ada kegiatan yang butuh kerjasama kelompok, kamulah si…",
		answers: [
			{ label: "A", text: "Si paling bisa diem", stereotypeId: "deep-listeners" },
			{ label: "B", text: "Si yang paling santai dan ikut alur aja", stereotypeId: "sloth-supremacy" },
			{ label: "C", text: "Si pendengar dan pemberi masukan", stereotypeId: "deep-listeners" },
			{ label: "D", text: "Si tiba-tiba laper", stereotypeId: "fuel-squad" },
			{ label: "E", text: "Si paling semangat bikin yel-yel", stereotypeId: "harmony-fan" },
		],
	},
	{
		id: 4,
		question: "Pas lagi final games, kamu ngapain?",
		answers: [
			{ label: "A", text: "Nyusun strategi, kelompok dan clanku menang!", stereotypeId: "ambis-arc" },
			{ label: "B", text: "Berusaha untuk tetap kering", stereotypeId: "high-maintenance-peeps" },
			{ label: "C", text: "Minta tolong panitia fotoin ke-chaos-an ini", stereotypeId: "shutterbug" },
			{ label: "D", text: "Ngeramein dan ngerusuhin", stereotypeId: "human-wifi" },
			{ label: "E", text: "Yang penting kelompokku aman dah", stereotypeId: "pathfinders" },
		],
	},
	{
		id: 5,
		question: "Kalau ada games yang susah banget, kamu biasanya ngapain?",
		answers: [
			{ label: "A", text: "Baca aturan dulu sambil mikir strategi mateng-mateng", stereotypeId: "pathfinders" },
			{ label: "B", text: "Mikir bikin laper", stereotypeId: "fuel-squad" },
			{ label: "C", text: "Doa minta hikmat dari Tuhan", stereotypeId: "harmony-fan" },
			{ label: "D", text: "Ngerti gak ngerti, gas-in dulu aja", stereotypeId: "pulse-energy" },
			{ label: "E", text: "Ku serahkan pada Tuhan dan kelompokku", stereotypeId: "sloth-supremacy" },
		],
	},
	{
		id: 6,
		question: "Biasanya, apa peranmu di kelompok camp?",
		answers: [
			{ label: "A", text: "Paling sibuk foto-fotoin dan videoin temen", stereotypeId: "shutterbug" },
			{ label: "B", text: "Pokoknya kelompokku harus terarah dan gak boleh linglung sendiri", stereotypeId: "pathfinders" },
			{ label: "C", text: "Kalah menang gak penting, yang penting kita wangi dan stylish", stereotypeId: "high-maintenance-peeps" },
			{ label: "D", text: "Apapun itu kelompok aku harus menang", stereotypeId: "ambis-arc" },
			{ label: "E", text: "Yang ajak mutualan sosmed sama temen sekelompok", stereotypeId: "human-wifi" },
		],
	},
	{
		id: 7,
		question: "Kamu di camp paling gak tahan kalau…",
		answers: [
			{ label: "A", text: "Kelamaan diem, pengen gerak terus", stereotypeId: "pulse-energy" },
			{ label: "B", text: "Worship-nya kurang hidup atau kurang feel", stereotypeId: "harmony-fan" },
			{ label: "C", text: "Sesi-nya bentar banget, masih pengen lanjut", stereotypeId: "deep-listeners" },
			{ label: "D", text: "Laper banget 😭", stereotypeId: "fuel-squad" },
			{ label: "E", text: "Harus bangun pagi banget, berat banget", stereotypeId: "sloth-supremacy" },
		],
	},
	{
		id: 8,
		question: "Kalau ada masalah di tim, kamu bakal…",
		answers: [
			{ label: "A", text: "Dokumentasiin aja, siapa tahu jadi kenangan seru nanti", stereotypeId: "shutterbug" },
			{ label: "B", text: "Coba nenangin suasana biar gak makin panas", stereotypeId: "pathfinders" },
			{ label: "C", text: "Males ribet, mending diem aja", stereotypeId: "high-maintenance-peeps" },
			{ label: "D", text: "Cari solusi yang paling efektif", stereotypeId: "ambis-arc" },
			{ label: "E", text: "Langsung turun tangan bantu beresin", stereotypeId: "human-wifi" },
		],
	},
	{
		id: 9,
		question: "Persiapan kamu sebelum berangkat camp?",
		answers: [
			{ label: "A", text: "Sepatu olahraga, biar kaki aman gak lecet", stereotypeId: "pulse-energy" },
			{ label: "B", text: "Hafalin lagu-lagu camp, harus bisa nyanyi semua!", stereotypeId: "harmony-fan" },
			{ label: "C", text: "Buku catatan dan alat tulis, siapa tahu dapet insight baru", stereotypeId: "deep-listeners" },
			{ label: "D", text: "Stock snack banyak, biar tetap fokus 😆", stereotypeId: "fuel-squad" },
			{ label: "E", text: "Bantal leher, penyelamat tidurku", stereotypeId: "sloth-supremacy" },
		],
	},
	{
		id: 10,
		question: "Hal yang paling kamu pengen dapetin dari camp tahun ini?",
		answers: [
			{ label: "A", text: "Foto/video seru bareng temen", stereotypeId: "shutterbug" },
			{ label: "B", text: "Pengalaman buat mimpin kelompok", stereotypeId: "pathfinders" },
			{ label: "C", text: "Tampil paling kece di camp 😎", stereotypeId: "high-maintenance-peeps" },
			{ label: "D", text: "Belajar jadi lebih disiplin", stereotypeId: "ambis-arc" },
			{ label: "E", text: "Dapet banyak temen baru", stereotypeId: "human-wifi" },
		],
	},
];

export function getStereotypeById(id: StereotypeId) {
	return stereotypes[id];
}