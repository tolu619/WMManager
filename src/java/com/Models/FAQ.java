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
public class FAQ 
{
    public String Question;
    public String Answer;
    public String Hyperlink;
    
    public FAQ(){} //Constructor
    
    public FAQ(String question, String answer, String hyperlink)
    {
        Question = question;
        Answer = answer;
        Hyperlink = hyperlink;
    }
}
