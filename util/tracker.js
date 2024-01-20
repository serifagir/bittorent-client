"use strict";

import dgram from "node:dgram";
import { Buffer } from "node:buffer";
import crypto from "crypto";

export const getPeers = (torrentFile, callback) =>  {
    const udpSocket = dgram.createSocket("udp4");
    const parsedUrl = torrentFile.announce.toString("utf8");

    udpSocketSend(udpSocket, createConnectionRequest(), parsedUrl);

    udpSocket.on("message", response => {
        if (responseType(response) === "connect") {
            const connectionResponse = parseConnectionResponse(response);
            const announceRequest = createAnnounceRequest(connectionResponse.connectionId);

            udpSocketSend(udpSocket, announceRequest, parsedUrl);
        } else if (responseType(response) === "announce") {
            const announceResponse = parseAnnounceResponse(response);
            callback(announceResponse.peers);
        }
    });
};

function udpSocketSend(socket, msg, rawUrl, callback = () => { }) {
    const url = new URL(rawUrl);
    socket.send(msg, 0, msg.length, url.port, url.host, callback);
}

function responseType() {
    
}

function createConnectionRequest() {
    const buffer = Buffer.alloc(16);

    buffer.writeUInt32BE(0x417, 0);
    buffer.writeUInt32BE(0x27101980, 4);
    buffer.writeUInt32BE(0, 8);
    crypto.randomBytes(4).copy(buffer, 12);

    return buffer;
}

function parseConnectionResponse(response) {
    return {
        action: response.readUInt32BE(0),
        transactionId: response.readUInt32BE(4),
        connectionId: response.slice(8)
    }
}

function createAnnounceRequest() {
    
}

function parseAnnounceResponse() {
    
}
