package main

import (
	"io/ioutil"
	"os"
)

func main() {
	dirs := [20]string{"airdrop", "annoucement", "blog", "chat", "dating", "group", "middleware", "notification", "qa", "restaurant",
		"schedule", "shop", "shopreview", "shortlink", "shortnotes", "timeline", "todolist", "transaction", "user"}
	componentsDir := "../../src/components/"
	// pageDir := "../../src/pages/"
	for _, f := range dirs {
		os.Mkdir(componentsDir+f+"/", 0644)
		ioutil.WriteFile(componentsDir+f+"/readme.md", []byte("A folder for components"), 0644)
	}
	// rootDir := "../../../backend/../../src/modules/"
	// files, err := ioutil.ReadDir(rootDir)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// folders := []string{}
	// for _, f := range files {
	// 	if f.IsDir() {
	// 		folders = append(folders, f.Name())
	// 	}
	// }
	// template, err := ioutil.ReadFile("./template/index.ts")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// for _, f := range folders {
	// 	temp := strings.ReplaceAll(string(template), "moduleName", f+"Routes")
	// 	ioutil.WriteFile(rootDir+f+"/index.ts", []byte(temp), 0644)
	// 	os.Mkdir(rootDir+f+"/routes/", 0644)
	// }

}
