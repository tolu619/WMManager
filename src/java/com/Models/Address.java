/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Models;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import wmengine.Managers.DBManager;
import wmengine.Tables.Tables;

/**
 *
 * @author KOWinUltra
 */
public class Address 
{
    public String Country;
    public String State;
    public String Town;
    public String LocalGovernment;
    public String BusStop;
    public String Street;
    public String HouseNumber;
    
    public Address(){} //Constructor
    
    public Address(int CountryID, int StateID, int TownID, int LgaID, int BusStopID, int StreetID, int HouseNoID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException
    {
        //Country = DBManager.GetString(Tables.AddressCountries.Name, Tables.AddressCountries.Table, "");
        State = DBManager.GetString(Tables.StateTable.Name, Tables.StateTable.Table, "");
        Town = DBManager.GetString(Tables.TownTable.Name, Tables.TownTable.Table, "");
        LocalGovernment = DBManager.GetString(Tables.LGATable.LGA, Tables.LGATable.Table, "");
        BusStop = DBManager.GetString(Tables.BusStopTable.Name, Tables.BusStopTable.Table, "");
        Street = DBManager.GetString(Tables.StreetTable.Name, Tables.StreetTable.Table, "");
    }
    
}
