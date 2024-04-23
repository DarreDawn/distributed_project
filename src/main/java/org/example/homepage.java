package org.example;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/post")
public class homepage extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String content = request.getParameter("content");
        String tag = request.getParameter("tag");

        // 这里处理内容和标签，比如存储到数据库等

        // 然后发送回客户端
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"status\":\"success\", \"content\":\"" + content + "\", \"tag\":\"" + tag + "\"}");
    }
}
