package com.copeapp.servlet.market;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/rest/createmarket")
public class CreateMarket extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
    public CreateMarket() {
        super();
    }
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/*
		ObjectMapper objMap = new ObjectMapper();
		EntityManager entitymanager = EntityManagerFactoryGlobal.getInstance().getEmfactory().createEntityManager();
		try {
			CreateMarketRequestDTO createMarketRequest = objMap.readValue(request.getInputStream(), CreateMarketRequestDTO.class);
//			if (!ObjectsValidationUtility.validateNonNullParameters(createMarketRequest)) {
				response.setStatus(HttpStatusUtility.UNAUTHORIZED);
				ExceptionDTO errorResponse = new ExceptionDTO(null, HttpStatusUtility.UNAUTHORIZED, "Errore interno all'applicazione", "La richiesta � ben formatta ma presenta alcuni attributi nulli (che non devono esserlo)");
				objMap.writeValue(response.getOutputStream(), errorResponse);
			} else {
				entitymanager.getTransaction().begin();
				
				//User user = UserDAO.selectById(createMarketRequest.getCreatorId());
				Market market = new Market();
				market.setName(createMarketRequest.getName());
				market.setDescription(createMarketRequest.getDescription());
				market.setCreationDate(createMarketRequest.getCreationDate());
				market.setEliminationDate(null);
				market.setOpenDate(createMarketRequest.getOpenDate());
				market.setExpireDate(createMarketRequest.getExpireDate());
				market.setVisibleDate(createMarketRequest.getVisibleDate());
				market.setHiddenDate(createMarketRequest.getHiddenDate());
				//market.setCreator(user);
				market.setEliminator(null);
				//market.setMarketElements(MarketElementDao.getElementsListByIdsException(createMarketRequest.getMarketElementsIds()));

				entitymanager.persist(market);
				entitymanager.getTransaction().commit();
				response.setStatus(HttpStatusUtility.OK);
			}
		} catch (NoResultException nre) {
			ExceptionDTO errorResponse = new ExceptionDTO(nre, HttpStatusUtility.UNAUTHORIZED, "Errore nella creazione del Market", "Id utente creatore oppure id di uno dei market elements errati");
			response.setStatus(HttpStatusUtility.UNAUTHORIZED);
			objMap.writeValue(response.getOutputStream(), errorResponse);
		
		} catch (Exception ex) {
			ExceptionDTO errorResponse = new ExceptionDTO(ex, HttpStatusUtility.UNAUTHORIZED, "Errore interno all'applicazione", "Avvenuto errore non previsto");
			response.setStatus(HttpStatusUtility.INTERNAL_SERVER_ERROR);
			objMap.writeValue(response.getOutputStream(), errorResponse);
		
		} finally {
			entitymanager.close();
		}*/
	}

}
