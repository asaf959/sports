const channels = [
  "ESPN",
  "ESPN2",
  "ESPN3",
  "ESPNews",
  "ESPNU",
  "FS1",
  "FS2",
  "NFL Network",
  "NFL RedZone",
  "NBA TV",
  "MLB Network",
  "NHL Network",
  "TNT",
  "TBS",
  "ABC",
  "NBC",
  "CBS",
  "Fox",
  "NBC Sports Network (NBCSN)",
  "CBS Sports Network",
  "Regional Sports Networks (RSNs)",
  "Big Ten Network (BTN)",
  "SEC Network",
  "ACC Network",
  "Pac-12 Network",
  "YES Network",
  "NESN",
  "AT&T SportsNet",
  "Altitude Sports",
  "Bally Sports",
]

const defaultChannels = channels.map(val => ({
  label: val,
  value: val,
  icon: `/channels/${val}.svg`
}))

export default defaultChannels;