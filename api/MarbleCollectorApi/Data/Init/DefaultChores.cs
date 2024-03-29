﻿using MarbleCollectorApi.Data.Models;
using System;
using System.Collections.Generic;

namespace MarbleCollectorApi.Data.Init
{
    public class DefaultChores : IDataSeeder<Chore>
    {

        public IEnumerable<Chore> GetDemoData()
        {
            return new[]
            {
                new Chore
                {
                    Name = "Frühlingsputz",
                    Value = 10,
                    DueDate = DateTime.UtcNow.AddDays(-5),
                    Description = "Wir putzen als Familie die ganze Wohnung, ausser Lena!",
                },
            };
        }

        public IEnumerable<Chore> GetDevelopmentData()
        {
            return new[]
            {
                new Chore
                {
                    Name = "Zimmer aufräumen",
                    Value = 5,
                    DueDate = DateTime.UtcNow.AddDays(1),
                    Description = "Alles ist an seinem Ort verstaut, nichts steht mehr im Weg rum.",
                },
                new Chore
                {
                    Name = "Zaun streichen",
                    Value = 20,
                    DueDate = DateTime.UtcNow.AddDays(14)
                },
                new Chore
                {
                    Name = "Rasen mähen",
                    Value = 7,
                    DueDate = DateTime.UtcNow.AddDays(5),
                    Description = "Vor und hinter dem Haus, ausserdem auch rund um die Garage.",
                },
                new Chore
                {
                    Name = "Abfallsack im Container entsorgen",
                    Value = 1,
                    DueDate = new DateTime(2021, 9, 28),
                    Description = "Abfallmarke nicht vergessen auf den Sack zu kleben!",
                }
                ,
                new Chore
                {
                    Name = "Zimmer aufräumen und staubsaugen",
                    Value = 10,
                    DueDate = new DateTime(2021, 12, 24)
                },
                new Chore
                {
                    Name = "Zähne putzen",
                    Value = 1,
                    DueDate = DateTime.UtcNow.AddDays(-1)
                }
                ,
                new Chore
                {
                    Name = "Tisch abräumen",
                    Value = 1,
                    DueDate = DateTime.UtcNow
                }
            };
        }
    }
}