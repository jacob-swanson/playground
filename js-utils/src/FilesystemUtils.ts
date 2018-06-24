import * as fs from "fs";

export class FilesystemUtils {
    private constructor() {
    }

    public static mkdir(path: string) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
}