/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Models;

/**
 *
 * @author KOWinUltra
 */
public class ServiceProperty 
{
    public String Name;
    public String[] Values;
//    public ArrayList<String> Values;
    
    public ServiceProperty(){} //Constructor
    
    public ServiceProperty(String Data)
    {
        if (!"\n".equals(Data)) 
        {
            try
            {
                Name = Data.split("~")[0];
                String ValuesList = Data.split("~")[1];
                Values = ValuesList.split("[|]");
            }
            catch(Exception e)
            {
                String Message = e.getMessage();
            }
            finally
            {

            }
        }
    }
    
}
