// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
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
        .invoke_handler(tauri::generate_handler![greet,students,read_parquet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> (String, String) {
    let x = format!("Hello, {}!", name);
    let y = format!("bye, {}!", name);
    (x, y)
}


#[tauri::command]
fn read_parquet(path: &str, num: i32) -> (String, String) {
    let mut file = std::fs::File::open(path).unwrap();
    let df = ParquetReader::new(&mut file).finish().unwrap();
    let df_d = &df;

    let mut title = df_d.get_column_names();
    let (rows, columns) = df_d.shape();
    println!("{:?}", title);
    println!("{} {}", rows, columns);
    let frame = df_d.head(Some(10));
    title.push("key");

    let mut res: Vec<HashMap<String, String>> = Vec::new();
    for i in 0..10 {
        let mut map = HashMap::new();
        map.insert(format!("key"), i.to_string());
        let result = frame.get_row(i).unwrap();
        for (i, v) in result.0.iter().enumerate() {
            map.insert(title.get(i).unwrap().to_string(), v.to_string());
            println!("{:?}", v);
        }
        res.push(map);
    }
    let value = serde_json::to_string(&res).unwrap();

    let mut titles: Vec<HashMap<String, String>> = Vec::new();
    for t in title.iter() {
        if t.to_string() == "key" {
            continue;
        }
        let mut map = HashMap::new();

        map.insert("title".to_string(), t.to_string());
        map.insert("key".to_string(), t.to_string());
        map.insert("dataIndex".to_string(), t.to_string());

        titles.push(map);
    }
    let ttt = serde_json::to_string(&titles).unwrap();
    println!("{}", value);
    println!("{}", ttt);
    (ttt, value)
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
#[warn(unused_imports)]
#[warn(unused_variables)]
fn test2() {
    let path = r"D:\Code\Python\fast-backtest\back_test_local\data\HDATA_HO\EURUSDSP\TICK_BAR_1H\201801.parquet";

    read_parquet(path, 10);
}