// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();     //打开调试窗口
                window.close_devtools();    //打开调试窗口
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet,students])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}


#[tauri::command]
fn students() -> String {
    let v = vec![
        Student::new(String::from("lucky"), 12, 36.2, true),
        Student::new(String::from("luce"), 15, 53.6, false),
    ];
    serde_json::to_string(&v).unwrap()
}

#[derive(Serialize, Deserialize, Debug)]
struct Student {
    name: String,
    age: i32,
    socre: f64,
    is_boy: bool,

}

impl Student {
    fn new(name: String, age: i32, socre: f64, is_boy: bool) -> Student {
        Student {
            name,
            age,
            socre,
            is_boy,
        }
    }
}


#[test]
fn test() {
    println!("{}", students());
}
use polars::prelude::*;
#[test]
fn test2(){
    let path = r"D:\Code\Python\fast-backtest\back_test_local\data\HDATA_HO\EURUSDSP\TICK_BAR_1H\201801.parquet";

    // let mut file = std::fs::File::open(r"D:\Code\Python\fast-backtest\back_test_local\data\HDATA_HO\EURUSDSP\TICK_BAR_1H\201801.parquet").unwrap();


    // let df = ParquetReader::new(&mut file).finish().unwrap();
    let args = ScanArgsParquet::default();
    let lf = LazyFrame::scan_parquet(path, args).unwrap();
    for row in lf{
        println!("{}", row);

    }
}