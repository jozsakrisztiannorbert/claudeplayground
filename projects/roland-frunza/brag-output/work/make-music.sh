#!/usr/bin/env bash
# Writes music.wav: a 21 s pad in D minor with drone, air, three plucked notes and one bell, mixed low.
set -e
SFX=/home/user/claudeplayground/.claude/skills/brag/assets/sfx
# Chord tones (Hz): Dm (0-5.3s), Bb (5.3-10.6), F (10.6-15.9), C then Dm (15.9-21)
pad() { # pad <freq> <start> <end> : sine with slow attack/release, low level
  echo "sine=frequency=$1:duration=21,volume=0.11,afade=t=in:st=$2:d=1.6,afade=t=out:st=$(echo "$3-1.4" | bc):d=1.4,atrim=0:21"; }
ffmpeg -y -loglevel error \
 -f lavfi -i "sine=frequency=73.42:duration=21,volume=0.16,afade=t=in:st=0:d=2.5,afade=t=out:st=19:d=2" \
 -f lavfi -i "sine=frequency=110:duration=21,volume=0.08,afade=t=in:st=0:d=3,afade=t=out:st=19:d=2" \
 -f lavfi -i "$(pad 146.83 0 5.3)" -f lavfi -i "$(pad 174.61 0 5.3)" -f lavfi -i "$(pad 220 0 5.3)" \
 -f lavfi -i "$(pad 116.54 5.3 10.6)" -f lavfi -i "$(pad 146.83 5.3 10.6)" -f lavfi -i "$(pad 174.61 5.3 10.6)" \
 -f lavfi -i "$(pad 174.61 10.6 15.9)" -f lavfi -i "$(pad 220 10.6 15.9)" -f lavfi -i "$(pad 261.63 10.6 15.9)" \
 -f lavfi -i "$(pad 130.81 15.9 18.4)" -f lavfi -i "$(pad 164.81 15.9 18.4)" -f lavfi -i "$(pad 196 15.9 18.4)" \
 -f lavfi -i "$(pad 146.83 18.4 21)" -f lavfi -i "$(pad 220 18.4 21)" -f lavfi -i "$(pad 293.66 18.4 21)" \
 -f lavfi -i "anoisesrc=d=21:c=pink:a=0.5,lowpass=f=900,highpass=f=200,volume=0.035,afade=t=in:st=0:d=4,afade=t=out:st=18.5:d=2.5" \
 -f lavfi -i "aevalsrc='0.22*exp(-(t-3.6)*2.2)*sin(2*PI*293.66*(t-3.6))*gt(t,3.6) + 0.22*exp(-(t-12.0)*2.2)*sin(2*PI*349.23*(t-12.0))*gt(t,12.0) + 0.18*exp(-(t-17.6)*2.6)*sin(2*PI*440*(t-17.6))*gt(t,17.6)':d=21,lowpass=f=2400" \
 -i "$SFX/impact/impactBell_heavy_003.ogg" \
 -i "$SFX/interface/click_001.ogg" \
 -filter_complex "[18]adelay=1900|1900,volume=0.22,lowpass=f=3000[bell];[19]adelay=10400|10400,volume=0.25[click];[0][1][2][3][4][5][6][7][8][9][10][11][12][13][14][15][16][17][bell][click]amix=inputs=20:normalize=0,lowpass=f=5000,alimiter=limit=0.9,afade=t=out:st=19.6:d=1.4,atrim=0:21[out]" \
 -map "[out]" -ar 48000 -ac 2 music.wav
ffprobe -v error -show_entries format=duration -of csv=p=0 music.wav
