"use strict";
import bencode from "bencode";
import fs from "fs";
import {getPeers} from "./util/tracker.js";


const parsedTorrentFile = bencode.decode(fs.readFileSync("test.torrent"), "utf8");

getPeers(parsedTorrentFile, peers => { console.log(peers); });