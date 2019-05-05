package main

import (
	"log"
	"net/http"
	"strings"
)

func main() {
	staticHandler := http.StripPrefix("/static/",
		http.FileServer(http.Dir("/website/static")))

	router := http.DefaultServeMux

	router.HandleFunc("/", buildHandler)
	router.Handle("/static/", staticHandler)

	log.Fatal(
		http.ListenAndServe(
			":8080", router))
}

func buildHandler(w http.ResponseWriter, r *http.Request) {
	fileParts := strings.Split(r.URL.Path, ".")
	if len(fileParts) > 1 {
		http.ServeFile(w, r, "/website"+ r.URL.Path)
		return
	}
	http.ServeFile(w, r, "/website/index.html")
}