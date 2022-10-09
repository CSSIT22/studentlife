package main

import (
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

func main() {
	rootDir := "../../src/modules/"
	files, err := ioutil.ReadDir(rootDir)
	if err != nil {
		log.Fatal(err)
	}
	folders := []string{}
	for _, f := range files {
		if f.IsDir() {
			folders = append(folders, f.Name())
			// fmt.Println(f.Name())
		}
	}
	template, err := ioutil.ReadFile("./template/index.ts")
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range folders {
		// files := readDir(rootDir, f)
		// if contains(files, "index.ts") {
		// 	continue
		// }
		temp := strings.ReplaceAll(string(template), "moduleName", f+"Routes")
		ioutil.WriteFile(rootDir+f+"/index.ts", []byte(temp), 0644)
		os.Mkdir(rootDir+f+"/routes/", 0644)
		// fmt.Print(f)
	}

	importRoutes := ""
	mountsRoutes := ""
	for _, f := range folders {
		importRoutes += fmt.Sprintf("import %sRoutes from \"./modules/%s\"\n", f, f)
		// importRoutes += "import " + f + "Routes" + " from './modules/" + f + "';\n"
		mountsRoutes += fmt.Sprintf("app.use(\"/%s\", %sRoutes)\n", f, f)
		// mountsRoutes += "app.use('/" + f + "'," + f + "Routes" + ") \n"
	}
	templateHome, err := ioutil.ReadFile("./template/homeindex/index.ts")
	if err != nil {
		log.Fatal(err)
	}
	temp := strings.ReplaceAll(strings.ReplaceAll(string(templateHome), "//{routeimport}", importRoutes), "//{routemount}", mountsRoutes)
	ioutil.WriteFile("../../src/index.ts", []byte(temp), 0644)

}

func readDir(rootDir string, f string) []string {
	check, err := ioutil.ReadDir(rootDir + f)
	if err != nil {
		log.Fatal(err)
	}
	readFile := func(c fs.FileInfo) string {
		return c.Name()
	}
	files := []string{}
	for _, file := range check {
		files = append(files, readFile(file))
	}
	return files
}

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
