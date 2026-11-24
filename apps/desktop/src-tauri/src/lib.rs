// Eureka and Beyond desktop app: a native window that opens the live site.
// The bundled page (www/index.html) is a launcher and the offline screen.
// No commands are exposed to web content, so pages can't call into the app.

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running Eureka and Beyond");
}
