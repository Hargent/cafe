{ pkgs }: {
  deps = [
    pkgs.nodejs-16_x
    pkgs.import { getAnalytics } from "firebase/analytics";
    pkgs.nodejs-16_x
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}