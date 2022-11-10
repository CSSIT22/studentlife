package main

import (
	"fmt"
	"os/exec"
)

func main() {
	branchs := [20]string{"blog", "chat", "dating", "group", "notification", "qa", "restaurant",
		"schedule", "shop", "shopreview", "shortlink", "shortnotes", "timeline", "todolist", "transaction", "user"}
	for _, b := range branchs {
		cmdStruct := exec.Command("git", "checkout", "-b", b)
		out, err := cmdStruct.Output()
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(string(out))
		cmdStruct2 := exec.Command("git", "push", "origin", "-u", b)
		out1, err1 := cmdStruct2.Output()
		if err1 != nil {
			fmt.Println(err1)
		}
		fmt.Println(string(out1))

	}

}
